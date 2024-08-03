import { Component, Input, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { Expertise,Education } from '../../../../models/expertise';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'expertise-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,CardModule,ButtonModule,CommonModule],
  templateUrl: './expertise-info.component.html',
  styleUrl: './expertise-info.component.scss'
})
export class ExpertiseInfoComponent implements OnInit {

  @Input() sharedUpdateFlag = false; // this is a variable passing from userprofilecomponent
expertise!:Expertise[];
 education!:Education[];
 selectedEducation!:Education[];
 selectedExpertise!: Expertise[];
 updatedExpertise!: Expertise[];
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
  
  if (this.updatedExpertise && this.updatedExpertise.length > 0) {
    this.selectedExpertise = this.updatedExpertise;
  } else {
    // Handle the case where expertiseInformation is null or empty if needed
    this.selectedExpertise = [];
  }

  console.log(this.updatedExpertise)
  console.log("hi")


  }
  

  updateExpertise(event:any)
  {

   this.updatedExpertise=event.value;
   console.log(this.updatedExpertise)
   this.profileService.setProfileInformation({
    ...this.profileService.getProfileInformation(),
    expertiseInformation: this.updatedExpertise
  });
  }

  


  nextPage() {

  
    if(this.updatedExpertise!=null)
      {
          this.router.navigate(['profile/education'])
      }
    
  }
}
