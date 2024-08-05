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
import { AuthService } from '../../../../services/auth.service';
import { JobSeeker } from '../../../../models/jobSeeker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
export interface updatedExpertiseRequest{
  profileId:number,
  ExpertiseIds:Expertise[]
}

@Component({
  selector: 'expertise-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,CardModule,ButtonModule,CommonModule,ToastModule],
  templateUrl: './expertise-info.component.html',
  styleUrl: './expertise-info.component.scss'
})


export class ExpertiseInfoComponent implements OnInit {

  @Input() sharedUpdateFlag = false; // this is a variable passing from userprofilecomponent
  @Input() userProfile: JobSeeker= {} as JobSeeker
expertise!:Expertise[];
 education!:Education[];
 selectedEducation!:Education[];
 selectedExpertise!: Expertise[];
 updatedExpertise!: Expertise[];
 updatedExpertiseData!:Expertise[]
 updatedEducation={
  types:null
 }

 updatedRequestApiData:updatedExpertiseRequest= {} as updatedExpertiseRequest
  constructor(
    private queryService:QueryService,
    private profileService: ProfileService,
    private  router:Router,
    private dataService:DataService,
    private messageService: MessageService
   
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



  }
  

  updateExpertise(event:any)
  {

   this.updatedExpertise=event.value;

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

  updateExpertiseFromProfile()
  {
    // const currentExpertiseIds = new Set(this.userProfile.expertiseInformation.map(expertise => expertise.expertiseId));
    
    // const newExpertise = this.profileService.getProfileInformation().expertiseInformation.filter((expertise: { expertiseId: string; }) => 
    //   !currentExpertiseIds.has(expertise.expertiseId)
    // );

   // this.updatedExpertiseData = newExpertise;


    if(this.profileService.getProfileInformation().expertiseInformation)
    {
      this.updatedRequestApiData.ExpertiseIds=this.profileService.getProfileInformation().expertiseInformation.map((expertise: { expertiseId: any; }) => expertise.expertiseId);
      this.updatedRequestApiData.profileId=this.userProfile.profileId
  
      this.queryService.updateExpertise(this.updatedRequestApiData).subscribe((response:any)=>{
        if(response==200)
        {
                 this.show()
                 this.router.navigate(['seeker'])
        }
      })

    }

   

  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expertise Updated' });
}
}
