import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { QueryService } from '../../services/query.service';
import { DialogModule } from 'primeng/dialog';
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
import { RouterOutlet } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { ChipsModule } from 'primeng/chips';
import { Experience } from '../../models/experience';
import { ListboxModule } from 'primeng/listbox';
import { Expertise } from '../../models/expertise';
import { Jobpost } from '../../models/job';

@Component({
  selector: 'owner-view',
  standalone: true,
  imports: [DialogModule,FormsModule,CommonModule,CardModule,ButtonModule,OwnerNavbarComponent,FileUploadModule,DropdownModule,StepperModule,RouterOutlet,StepsModule,
    ChipsModule,ListboxModule,ButtonModule],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss'
})




export class OwnerViewComponent implements OnInit, OnDestroy{
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
  steps: any[] = [
      { label: 'Job Details' },
      { label: 'Skills' },
      {
        label:'Logo'
      }
      // Add more steps as needed
  ];
  values: string[] | undefined;
  selectedExperience!: Experience[];
  experience!:Experience[];
  expertise!:Expertise[];

  jobTypes:any;


  bakeryOwnerProfileInfoSubscription:Subscription;
  constructor(
    private dataService:DataService,
    private queryService:QueryService,
    private cdr:ChangeDetectorRef,
    private messageService:MessageService,
    private profileService:ProfileService
  )
  {
    this.bakeryOwnerProfileInfoSubscription = this.profileService.bakeryOwnerProfileInfo$.subscribe();
  }


  maxSize:number=10000;
  selectedExpertise!: Expertise[];

  ngOnInit(): void {

     this.experience= [
      {
       name:'No Experince', id:1,
       
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
  

 
    this.dataService.getPhoneData().subscribe((data)=>{
      this.phoneno='8921537948';
    

  

      
    })

    
   this.queryService.getBakeOwner({ phoneno: this.phoneno}).subscribe((data)=>{
       this.bakeMember=data;
       this.selectedDistrict=data.district;
       console.log(this.bakeMember)

   });


    this.showDialogSubscription = this.dataService.showDialog$.subscribe(() => {
      this.visible = true; // Show the dialog when the service notifies
    });


    this.queryService.getExpertiseTypes().subscribe((data)=>{
      this.expertise=data;
    })


   

  }

  
  ngOnDestroy(): void {
    console.log(this.showDialogSubscription?.unsubscribe())
   
 
    console.log(this.bakeryOwnerProfileInfoSubscription?.unsubscribe());
  

   
  }

  updateExperience(event:any)
  {


    this.jobPost.ExperienceId= event.value.id
  
  }
  

  nextStep() {
    this.activeIndex++;
}

previousStep() {
    this.activeIndex--;
}


  
updateExpertise(event: any) {
  console.log(event);
  // Extract expertiseIds from the event value array
  const expertiseIds: number[] = event.value.map((item: any) => item.expertiseId);

  // Assign expertiseIds to the ExpertiseIds list in jobPost
  this.jobPost.ExpertiseIds = expertiseIds;

  console.log(this.jobPost.ExpertiseIds)
}

  uploadedFiles:any
  submitJob() {

    this.jobPost.PostedById=this.bakeMember.memberId
    this.jobPost.BusinessId=this.bakeMember.businessId
    this.jobPost.DistrictId = this.selectedDistrict?.id
    this.jobPost.JobTypeId = parseInt(this.jobTypes)
    
  
    this.queryService.createJobPost(this.jobPost).subscribe((response)=>{
      console.log(response)
    })

    // Push the submitted job to the list of submitted jobs
    // this.submittedJobs.push({
    //   jobTitle: this.job.jobTitle,
    //   company: this.bakeMember.businessName,
    //   location: this.job.location,
    //   jobType: this.job.jobType,
    //   salary: this.job.salary,
    //   jobDescription: this.job.jobDescription,
    //   skills:this.values
    // });

    // console.log(this.submittedJobs)

    // // Clear the form fields after submission
    // this.job.jobTitle = '';
    // this.job.location = '';
    // this.job.jobType = '';
    // this.job.salary = '';
    // this.job.jobDescription = '';

    // this.visible=false;
    // this.cdr.detectChanges()
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    console.log(event)
}

myUploader(event: any) {
  console.log("onUpload() START");
  console.log(event);
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
  
  console.log(base64String)
}

}



