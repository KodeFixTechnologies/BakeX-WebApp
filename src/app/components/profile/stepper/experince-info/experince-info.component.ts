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
@Component({
   selector: 'experince-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,CardModule,ButtonModule],
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
 selectedExperience!: Experience[];
 updatedExperience={
  types:null
 };

 updatedEmployment={
  types:null
 }
  constructor(
    private queryService:QueryService,
    private profileService: ProfileService,
    private  router:Router,
    private dataService:DataService
  )
  {

  }

  
  ngOnInit(): void {

    this.dataService.getUserData().subscribe((data)=>{
      this.user=data;

      console.log(this.user)

    })

   

    this.queryService.getEmploymentTypes().subscribe((data)=>{

      this.employment=data;

      console.log(this.employment)
      
    })


   
  this.experience = [
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

 
  ]

  this.updatedExperience = this.profileService.getProfileInformation().experienceInformation;
  this.updatedEmployment =this.profileService.getProfileInformation().employmentInformation;
  console.log(this.updatedExperience)

  }
  
  

  updateExperience(event:any)
  {
    console.log(event)
   this.updatedExperience.types=event.value;
   console.log(this.updatedExperience)

   this.profileService.setProfileInformation({
    ...this.profileService.getProfileInformation(),
    experienceInformation: this.updatedExperience
  });
  }

  updateEmployment(event:any)
  {
  this.updatedEmployment.types=event.value;
    console.log(this.updatedExperience)

   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     employmentInformation: this.updatedEmployment
   });
  }


  mapProfileInfoToAPI()
  {
    this.profile= this.profileService.getProfileInformation();
   
    console.log(this.profile)
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

  console.log(this.userProfile)
  }


  nextPage() {

    this.profile= this.profileService.getProfileInformation();
    this.queryService.createUser(this.user).subscribe((response=>{
      console.log(response);


      if(response==true)
        {

          this.queryService.insertProfile(this.userProfile).subscribe((response)=>{
            console.log(response)
            if(response==200)
              {
                this.router.navigate(['/seeker'])
              }
          })
        }

    }))
  
  this.mapProfileInfoToAPI()


   
    //  this.dataService.setPhoneData(this.profileService.getProfileInformation().personalInformation.phoneno);
    //  this.router.navigate(['/otp']);

    
  
  
        //  
      
    
  }
}
