import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { Expertise,Education } from '../../../../models/expertise';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'expertise-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,CardModule,ButtonModule],
  templateUrl: './expertise-info.component.html',
  styleUrl: './expertise-info.component.scss'
})
export class ExpertiseInfoComponent implements OnInit {

 expertise!:Expertise[];
 education!:Education[];
 selectedEducation!:Education[];
 selectedExpertise!: Expertise[];
 updatedExpertise={
  types:null
 };

 updatedEducation={
  types:null
 }
  constructor(
    private queryService:QueryService,
    private profileService: ProfileService,
    private  router:Router,
  )
  {

  }

  
  ngOnInit(): void {
  

    this.queryService.getExpertiseTypes().subscribe((data)=>{
      this.expertise=data;
    })



   
  this.education = [
    {
     name:'Less Than High School', code:'LHS',
     
    },
    {
      name:'High School', code :'HS',
    },
    {
      name:'Diploma Degree', code:'DD'
    },

    {
      name:'Bachleor\'s Degree', code:'BD'
    },

    {
      name:'Master\'s Degree', code:'MD'
    }
  ]

  this.updatedExpertise = this.profileService.getProfileInformation().expertiseInformation;
  this.updatedEducation =this.profileService.getProfileInformation().educationInformation;
  console.log(this.updatedExpertise)

  }
  

  updateExpertise(event:any)
  {
   this.updatedExpertise.types=event.value;
   console.log(this.updatedExpertise)

   this.profileService.setProfileInformation({
    ...this.profileService.getProfileInformation(),
    expertiseInformation: this.updatedExpertise
  });
  }

  updateEducation(event:any)
  {
  this.updatedEducation.types=event.value;
    console.log(this.updatedExpertise)

   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     expertiseInformation: this.updatedEducation
   });
  }



  nextPage() {

  
    if(this.updatedEducation.types!=null)
      {
          this.router.navigate(['profile/experience'])
      }
    
  }
}
