import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { Expertise,Education } from '../../../../models/expertise';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
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
    private dataService:DataService
  )
  {

  }

  
  ngOnInit(): void {
    this.dataService.requestExpand('expertise');

    this.queryService.getExpertiseTypes().subscribe((data)=>{
    
      this.expertise=data;
    })



   
  this.education = [
    {
     EducationLevel:'Less Than High School', EducationId:1,
     
    },
    {
      EducationLevel:'High School', EducationId :2,
    },
    {
      EducationLevel:'Diploma Degree', EducationId:3
    },

    {
      EducationLevel:'Bachleor\'s Degree', EducationId:4
    },

    {
      EducationLevel:'Master\'s Degree', EducationId:5
    }
  ]

  this.updatedExpertise = this.profileService.getProfileInformation().expertiseInformation;
  this.updatedEducation =this.profileService.getProfileInformation().educationInformation;


  }
  

  updateExpertise(event:any)
  {
   this.updatedExpertise.types=event.value;

   this.profileService.setProfileInformation({
    ...this.profileService.getProfileInformation(),
    expertiseInformation: this.updatedExpertise.types
  });
  }

  updateEducation(event:any)
  {
  this.updatedEducation.types=event.value;


   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     educationInformation: this.updatedEducation
   });
  }



  nextPage() {

  
    if(this.updatedExpertise.types!=null)
      {
          this.router.navigate(['profile/education'])
      }
    
  }
}
