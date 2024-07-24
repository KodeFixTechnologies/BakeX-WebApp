import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { Experience,Employment } from '../../../../models/experience';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Msg91Service } from '../../../../services/msg91.service';
import { DataService } from '../../../../services/data.service';
import { UserProfile, Users } from '../../../../models/user';
import { CommonModule } from '@angular/common';
import { WorkHistory } from '../../../../models/workhistory';
import { AuthService } from '../../../../services/auth.service';
@Component({
   selector: 'experince-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,CardModule,ButtonModule,CommonModule],
 templateUrl: './experince-info.component.html',
  styleUrl: './experince-info.component.scss'
})
export class ExperinceInfoComponent implements OnInit {

userProfile:UserProfile = { } as UserProfile
fullDetails:[]=[];
user:Users= {} as Users;
profile:any;
 experience!:Experience[];
 employment!:Employment[];
 selectedEmployment!:Employment[];
 selectedExperience!: Experience;
 updatedExperience={
  types:null
 };

 updatedEmployment={
  types:null
 }

 isExperienceSelected = false;
  constructor(
    private queryService:QueryService,
    private profileService: ProfileService,
    private  router:Router,
    private dataService:DataService,
    private authService:AuthService
  )
  {

  }
  workHistory: WorkHistory[] = [];
  addWorkHistory() {
    this.workHistory.push({
      employer: '',
      startDate: '',
      endDate: '',
      jobRole: '',
      editing:true
    });
  }

  removeWorkHistory(index: number) {
    this.workHistory.splice(index, 1);
  }

  toggleEdit(index: number) {
    this.workHistory[index].editing = !this.workHistory[index].editing;
  }

  cancelEdit(index: number) {
    this.workHistory[index].editing = false; // Exit edit mode without saving changes
  }

  updateWorkHistory(index: number) {
    // Implement update logic if needed
    this.workHistory[index].editing = false; // Exit edit mode after saving changes
  }

  ngOnInit(): void {
    this.dataService.requestExpand('experience');
    this.dataService.getUserData().subscribe((data)=>{
      this.user=data;

    })

   

    this.queryService.getEmploymentTypes().subscribe((data)=>{

      this.employment=data;
      
    })


   
  this.experience = [
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

 
  ]

  this.updatedExperience = this.profileService.getProfileInformation().experienceInformation;
  this.updatedEmployment =this.profileService.getProfileInformation().employmentInformation;

  }
  
  

  updateExperience(event:any)
  {

   this.updatedExperience.types=event.value;



   this.profileService.setProfileInformation({
    ...this.profileService.getProfileInformation(),
    experienceInformation: this.updatedExperience
  });
  }

  updateEmployment(event:any)
  {
  this.updatedEmployment.types=event.value;


   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     employmentInformation: this.updatedEmployment
   });
  }


  mapProfileInfoToAPI()
  {
    this.profile= this.profileService.getProfileInformation();
   

  this.userProfile.FirstName = this.profile.personalInformation.firstname;
  this.userProfile.LastName = this.profile.personalInformation.lastname;
  this.userProfile.Age = this.profile.personalInformation.age;
  this.userProfile.MobileNo = this.profile.personalInformation.phoneno;
  this.userProfile.Gender = this.profile.personalInformation.gender.name;
  this.userProfile.State = this.profile.locationInformation.state;
  this.userProfile.Place = this.profile.locationInformation.place;
  this.userProfile.ProfileCreatedDate = new Date().toISOString(); // Assuming you want current date/time
  this.userProfile.EducationId = this.profile.educationInformation.types.EducationId;
  this.userProfile.ExperienceId = this.profile.experienceInformation.types.id;
  this.userProfile.District = this.profile.locationInformation.district;
  this.userProfile.ExpertiseIds = this.profile.expertiseInformation.map((expertise: { expertiseId: any; }) => expertise.expertiseId);
  this.userProfile.JobTypeIds = this.profile.employmentInformation.types.map((job: { jobTypeId: any; }) => job.jobTypeId);
  this.userProfile.Pincode = this.profile.locationInformation.pincode;

  this.userProfile.WorkHistory = this.workHistory.map(history => ({
    employer: history.employer,
    startDate: history.startDate, // Convert Date to string
    endDate: history.endDate, // Convert Date to string
    jobRole: history.jobRole
  }));


  }


  nextPage() {

    this.profile= this.profileService.getProfileInformation();
    this.mapProfileInfoToAPI()
  
    this.queryService.createUser(this.user).subscribe((response=>{
  


      if(response==true)
        {

          this.queryService.insertProfile(this.userProfile).subscribe((response)=>{

            if(response==200)
              {
                this.authService.setPhoneNo(this.userProfile.MobileNo);

                this.authService.setUserProfileData(this.userProfile);
                this.dataService.setPhoneData(this.userProfile.MobileNo);
                this.router.navigate(['/seeker'])
              }
          })
        }

    }))
  



   
    //  this.dataService.setPhoneData(this.profileService.getProfileInformation().personalInformation.phoneno);
    //  this.router.navigate(['/otp']);

    
  
  
        //  
      
    
  }
}
