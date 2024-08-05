import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  @Input() switch:string='';
 
  ngOnInit() {
    this.dataService.toggleExpand$.subscribe(data => {
      this.toggleExpand(data);
      this.toggleOwnerExpand(data);
    });
  }

  constructor(private router:Router,
   private dataService:DataService

  )
  {
 
  }
  isOwnerProfileExpanded=false;
  isOwnerLocationExpanded=false;
  isOwnerBusinessExpanded=false;
  isOwnerLogoExpanded=false;


  isProfileExpanded = false;
  isLocationExpanded = false;
  isExpertiseExpanded = false;
  isEducationExpanded = false;
  isEmploymentExpanded = false;
  isExperienceExpanded = false;
 
  toggleOwnerExpand(data:string)
  {
    this.isOwnerProfileExpanded=false;
    this.isOwnerLocationExpanded=false;
    this.isOwnerBusinessExpanded=false;
    this.isOwnerLogoExpanded=false;

     switch(data)
     {
      case 'profile':
        this.isOwnerProfileExpanded = !this.isOwnerProfileExpanded;
        break;
      case 'location':
        this.isOwnerLocationExpanded = !this.isOwnerLocationExpanded;
        break;
      case 'business':
        this.isOwnerBusinessExpanded = !this.isOwnerBusinessExpanded;
        break;
      case 'logo':
        this.isOwnerLogoExpanded = !this.isOwnerLogoExpanded;
        break;

        default:
          console.warn(`Unknown expand type: ${data}`);
     }
  }


  toggleExpand(data: string) {
    this.isProfileExpanded = false;
    this.isLocationExpanded = false;
    this.isExpertiseExpanded = false;
    this.isEducationExpanded = false;
    this.isEmploymentExpanded = false;
    this.isExperienceExpanded = false;
  
    switch (data) {
      case 'profile':
        this.isProfileExpanded = !this.isProfileExpanded;
        break;
      case 'location':
        this.isLocationExpanded = !this.isLocationExpanded;
        break;
      case 'expertise':
        this.isExpertiseExpanded = !this.isExpertiseExpanded;
        break;
      case 'education':
        this.isEducationExpanded = !this.isEducationExpanded;
        break;
      case 'employment':
        this.isEmploymentExpanded = !this.isEmploymentExpanded;
        break;
      case 'experience':
        this.isExperienceExpanded = !this.isExperienceExpanded;
        break;
      default:
        console.warn(`Unknown expand type: ${data}`);
    }
  }

  goToLocation()
  {
  
    this.router.navigate(['profile/location']);
  }

  goToExperience()
  {
    this.toggleExpand('experience');
    this.router.navigate(['profile/experience']);
  }

  goToEducation()
  {
    this.toggleExpand('education');
    this.router.navigate(['profile/education']);
  }

  goToExpertise()
  {
    this.toggleExpand('expertise');
    this.router.navigate(['profile/expertise']);
  }

  goToEmployment()
  {
    this.toggleExpand('employment');
    this.router.navigate(['profile/employment']);
  }

  goToPersonal()
  {
    this.toggleExpand('profile');
    this.router.navigate(['profile/personal']);
  }


  //Stepper for Bake Owners

  goToOwnerPersonal()
  {
    this.toggleOwnerExpand('profile');
    this.router.navigate(['bakeprofile/owner'])
  }

 goToBusiness() {
  this.toggleOwnerExpand('businesss');
    this.router.navigate(['bakeprofile/business-info'])
  }

  goToOwnerLocation()
  {  this.toggleOwnerExpand('location');
    this.router.navigate(['bakeprofile/ownerlocation-info'])
  }

  goToOwnerLogo()
  {
    this.toggleOwnerExpand('logo');
    this.router.navigate(['bakeprofile/logo'])
  }
}
