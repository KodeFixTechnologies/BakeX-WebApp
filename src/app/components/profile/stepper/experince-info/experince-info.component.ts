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
@Component({
   selector: 'experince-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,CardModule,ButtonModule],
 templateUrl: './experince-info.component.html',
  styleUrl: './experince-info.component.scss'
})
export class ExperinceInfoComponent implements OnInit {

fullDetails:[]=[];
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
   

    this.queryService.getEmploymentTypes().subscribe((data)=>{

      this.employment=data;

      console.log(this.employment)
      
    })


   
  this.experience = [
    {
     name:'No Experince', code:'noxp',
     
    },
    {
      name:'1-5 Years', code :'min',
    },
    {
      name:'6-10 Years', code:'mid'
    },

    {
      name:'More than 10 Years', code:'max'
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
    ExperienceInformation: this.updatedExperience
  });
  }

  updateEmployment(event:any)
  {
  this.updatedEmployment.types=event.value;
    console.log(this.updatedExperience)

   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     ExperienceInformation: this.updatedEmployment
   });
  }



  nextPage() {
   
  


     console.log (this.profileService.getProfileInformation())
   
     this.dataService.setPhoneData(this.profileService.getProfileInformation().personalInformation.phoneno);
     this.router.navigate(['/otp']);

    
  
    // if(this.updatedEmployement.types!=null)
    //   {
    //       this.router.navigate(['profile/experience'])
    //   }
    
  }
}
