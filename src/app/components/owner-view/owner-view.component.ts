import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { QueryService } from '../../services/query.service';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Observable, Subscription } from 'rxjs';
import { BakeMember } from '../../models/bakeMember';
import { FormsModule } from '@angular/forms';
import { Job } from '../../models/job';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { OwnerNavbarComponent } from '../owner-navbar/owner-navbar.component';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { MenuItem, MessageService } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';
import { Dropdown } from 'flowbite';
import { DropdownModule } from 'primeng/dropdown';
import { District } from '../../models/location';
import { Stepper, StepperModule } from 'primeng/stepper';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { ChipsModule } from 'primeng/chips';
import { Experience } from '../../models/experience';
import { ListboxModule } from 'primeng/listbox';
import { Expertise } from '../../models/expertise';
import { Jobpost } from '../../models/job';
import { CarouselModule } from 'primeng/carousel';
import {
  GoogleGenerativeAI, HarmBlockThreshold, HarmCategory 
} from '@google/generative-ai';

import { Carousel } from 'flowbite';
import type {
    CarouselItem,
    CarouselOptions,
    CarouselInterface,
} from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { AuthService } from '../../services/auth.service';
import { JobCardComponent } from "../shared/job-card/job-card.component";
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment.development';



@Component({
    selector: 'owner-view',
    standalone: true,
    templateUrl: './owner-view.component.html',
    styleUrl: './owner-view.component.scss',
    imports: [DialogModule, FormsModule, CommonModule, CardModule, ButtonModule, OwnerNavbarComponent, FileUploadModule, DropdownModule, StepperModule, RouterOutlet, StepsModule,
        ChipsModule, ListboxModule, ButtonModule, CarouselModule, JobCardComponent]
})




export class OwnerViewComponent implements OnInit, OnDestroy{

  
  
  @ViewChild('dialog', { static: false }) dialog: Dialog | undefined;
  private backNavigationSubscription: Subscription | undefined;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  items: MenuItem[] = [];
  bakeMember:BakeMember={} as BakeMember
  visible:boolean=false;
  phoneno:string='';
  job:Job={} as Job
  jobPost:Jobpost={} as Jobpost
  jobTitle: string='';
  company: string='';
  location: string='';
  jobType: string='';
  salary: string='';
  jobDescription: string='';
  submittedJobs: Job[] = [];
  bookMarkJobs:Job[]=[];
  showDialogSubscription: Subscription | undefined;
  district:District[]|undefined;
  selectedDistrict:District|undefined;
  activeIndex: number = 0;
  activated:string='allJobs'
  steps: any[] = [
      { label: 'Job Details' },
      { label: 'Skills' },
      { label: 'Experience' },
      {
         label:'Logo'
       }
      // Add more steps as needed
  ];
  values: string[] | undefined;
  selectedExperience!: Experience[];
  experience!:Experience[];
  expertise!:Expertise[];

  jobPosts:Jobpost[]=[];
  top3JobPosts:Jobpost[]=[];
  expertiseTypeforGemini:string=''


  jobTypes:any;
  showImageUpload:boolean=false;


 

  bakeryOwnerProfileInfoSubscription:Subscription;
  constructor(
    private dataService:DataService,
    private queryService:QueryService,
    private cdr:ChangeDetectorRef,
    private messageService:MessageService,
    private profileService:ProfileService,
    private authService:AuthService,
    private router:Router
  )
  {
    this.bakeryOwnerProfileInfoSubscription = this.profileService.bakeryOwnerProfileInfo$.subscribe();
  }


  maxSize:number=10000;
  selectedExpertise: Expertise[]=[];
  displayImage:any;

  model:any

  
  ngOnInit(): void {

    this.dataService.setDataforheader(true);

    this.backNavigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.visible) {
        this.visible = false;
      }
    });

     this.experience= [
      {
       name:'No Experience', id:1,
       
      },
      {
        name:'1-5 Years', id :2,
      },
      {
        name:'6-10 Years', id:3
      },
  
      {
        name:'More than 10 Years', id:4
      },
  
   
    ];

    const genAI = new GoogleGenerativeAI(environment.API_KEY);
const generationConfig = {
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
  temperature: 0.9,
  top_p: 1,
  top_k: 32,
  maxOutputTokens: 100, // limit output
};
this.model = genAI.getGenerativeModel({
  model: 'gemini-pro', // or 'gemini-pro-vision'
  ...generationConfig,
});




    this.district = [
      { id: 257, name: 'Alappuzha' },
      { id: 258, name: 'Ernakulam' },
      { id: 259, name: 'Idukki' },
      { id: 260, name: 'Kannur' },
      { id: 261, name: 'Kasaragod' },
      { id: 262, name: 'Kollam' },
      { id: 263, name: 'Kottayam' },
      { id: 264, name: 'Kozhikode' },
      { id: 265, name: 'Malappuram' },
      { id: 266, name: 'Palakkad' },
      { id: 267, name: 'Pathanamthitta' },
      { id: 268, name: 'Thiruvananthapuram' },
      { id: 269, name: 'Thrissur' },
      { id: 270, name: 'Wayanad' }
  ];
  

    this.loadPhoneNumber()
    //  this.dataService.getUserData().subscribe((user=>{
    //   this.phoneno= user.mobileNumber
    //  }))
 
     this.dataService.getPhoneData().subscribe((data)=>{
      if(data)
      this.phoneno=data;
      else
    this.phoneno=this.authService.getPhoneNo() || '';
     })

  

    
     this.queryService.getBakeOwner({ phoneno: this.phoneno }).subscribe({
      next: (data) => {
        this.bakeMember = data;
        this.selectedDistrict = this.district?.find(item => item.name === data.district);
      

   
    
        if (this.bakeMember.profileImageBase64) {
          const imageUrl = `data:image/png;base64,${this.bakeMember.profileImageBase64}`; // Adjust the MIME type as per your image type
          this.displayImage = imageUrl;
        }
      },
      error: (error) => {
        console.error('Error fetching bake owner data', error);
      },
      complete: () => {
        
        this.getJobPostByOwner(this.bakeMember.memberId); // Assuming ownerId is available in bakeMember
      }
    });
    


    this.showDialogSubscription = this.dataService.showDialog$.subscribe(() => {
      this.visible = true; // Show the dialog when the service notifies
      history.pushState(null, '', location.href);
    });


    this.queryService.getExpertiseTypes().subscribe((data)=>{
      this.expertise=data;
    })

  this.dataService.setData(false)
   
   this.selectedDistrict = this.district.find(item=> item.id===this.bakeMember.districtId)


  }

  closeDialog(): void {
    this.visible = false;
    history.back();
  }

  maximizeDialog(): void {
    if (this.dialog) {
      this.dialog.maximize();
    }
  }

  loadPhoneNumber() {
    const token = this.authService.getToken();
    if (token) {
      this.phoneno = this.authService.getPhoneNo() || '';
     
    } else {
    
      // Optionally, you can retry after some delay or handle the missing token case
    }
  }
  
  ngOnDestroy(): void {
  
   

  

   
  }

  profilePageRediretion()
  {
    this.router.navigate(['/owner-profile'])

  }

  
  getJobPostByOwner(Id: number) {
    this.queryService.getJobPostByOwner(Id).subscribe({
      next: (data) => {
        this.jobPosts=data;
        this.dataService.setPostedJobData(this.jobPosts)
        this.dataService.setBakeryOwnerData(this.bakeMember)
        this.dataService.setImage(this.displayImage)
        this.top3JobPosts=this.jobPosts.slice(0,3);


      
        
      },
      error: (error) => {
        console.error('Error fetching job post data', error);
      },
      complete: () => {
  
      }
    });
  }

  updateExperience(event:any)
  {


    this.jobPost.ExperienceId= event.value.id
  
  }
  

  nextStep() {
    this.activeIndex++;
    if(this.activeIndex==3)
    {
      this.TestGeminiPro();
    }
}

previousStep() {
    this.activeIndex--;
}


async TestGeminiPro() {
  // Model initialisation missing for brevity
console.log(this.selectedExpertise)

  const prompt = `Generate a minimal and simple list of job responsibilities for a job Role: ${this.expertiseTypeforGemini} in the food industry for this  
  Company: ${this.bakeMember.businessName}, Salary: ${this.jobPost.salary}, Job Type: ${this.jobTypes}. 
  The response should only include job responsibilities in a sentence,sepearte each sentence with comma`;
  const result = await this.model.generateContent(prompt);
  console.log(result)
  const response = await result.response;

  if (response.candidates && response.candidates.length > 0) {
    const jobDesc = response.candidates[0].content.parts[0].text;
    this.jobPost.JobDescription = jobDesc;
  }

}
updateExpertise(event: any) {

  // Extract expertiseIds from the event value array
  const expertiseIds: number[] =[];
  expertiseIds.push(event.value.expertiseId)
 this.expertiseTypeforGemini = event.value.expertiseType;

  // Assign expertiseIds to the ExpertiseIds list in jobPost
  this.jobPost.ExpertiseIds = expertiseIds;

}

  uploadedFiles:any
  submitJob() {

    this.jobPost.PostedById=this.bakeMember.memberId
    this.jobPost.BusinessId=this.bakeMember.businessId
    this.jobPost.DistrictId = this.selectedDistrict?.id
    this.jobPost.jobTypeId = parseInt(this.jobTypes)
  
    console.log(this.jobPost.JobDescription)
  
     this.queryService.createJobPost(this.jobPost).subscribe((response)=>{
     
       this.visible=false
     })

     //ush the submitted job to the list of submitted jobs
     this.submittedJobs.push({
    jobTitle: this.job.jobTitle,
      company: this.bakeMember.businessName,
      location: this.job.location,
      jobType: this.job.jobType,
      salary: this.job.salary,
      jobDescription: this.job.jobDescription,
       skills:this.values
     });


    // // Clear the form fields after submission
    this.job.jobTitle = '';
    this.job.location = '';
     this.job.jobType = '';
     this.job.salary = '';
     this.job.jobDescription = '';

     this.visible=false;
     this.cdr.detectChanges()
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
   
}

myUploader(event: any) {

 
  const file = event.files[0]; // Assuming only one file is uploaded
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result as string;
    // Now you can send this base64String to your .NET Web API
    this.sendToBackend(base64String);
  };
  reader.readAsDataURL(file);
}

sendToBackend(base64String: string) {
  this.jobPost.ProfileImage=base64String;

}

getImageUrl(profileImage: string | null) {

  let imageType = '';
  if (profileImage?.startsWith('data:image/png')) {
    imageType = 'png';
  } else if (profileImage?.startsWith('data:image/jpeg') || profileImage?.startsWith('data:image/jpg')) {
    imageType = 'jpeg';
  }

  if (imageType) {
    return `data:image/${imageType};base64,${profileImage?.split(',')[1]}`;
  } else {
    // Handle unsupported image types or fallback
    return ''; // or default image URL
  }
}

editImage()
{
 this.showImageUpload=!this.showImageUpload;
}


goToAllJobs()
{
  this.router.navigate(['\owner-jobs']);
}

}



