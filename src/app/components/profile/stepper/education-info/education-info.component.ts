import { Component, OnInit } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { Education } from '../../../../models/expertise';
import { ProfileService } from '../../../../services/profile.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'education-info',
  standalone: true,
  imports: [ListboxModule,FormsModule,ButtonModule],
  templateUrl: './education-info.component.html',
  styleUrl: './education-info.component.scss'
})
export class EducationInfoComponent  implements OnInit{
  selectedEducation!:Education[];
  constructor(
    private profileService:ProfileService,
    private router:Router,
    private dataService:DataService
  )
  {

  }

  ngOnInit(): void {

    this.dataService.requestExpand('education');
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

    this.updatedEducation =this.profileService.getProfileInformation().educationInformation;
    console.log(this.updatedEducation)
    if(this.updatedEducation)
    {
      this.selectedEducation=this.profileService.getProfileInformation().educationInformation;
      console.log(this.selectedEducation)
    }
    else {
      this.selectedEducation = [];
    }
  
  }

  
  education!:Education[];

  updatedEducation:Education = {} as Education;


  updateEducation(event:any)
  {
  this.updatedEducation=event.value;
  

   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     educationInformation: this.updatedEducation
   });
  }


 
  nextPage() {

  
    if(this.updatedEducation!=null)
      {
          this.router.navigate(['profile/employment'])
      }
    
  }
}
