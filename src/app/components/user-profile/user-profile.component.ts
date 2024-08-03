import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobSeeker } from '../../models/jobSeeker';
import { PersonalInformationComponent } from "../shared/personal-information-card/personal-information.component";
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ExpertiseInfoComponent } from '../profile/stepper/expertise-info/expertise-info.component';
import { ProfileService } from '../../services/profile.service';

const shareData = {
  title: "Bake Joli",
  text: "Join Bake Joli",
  url: "www.bakejoli.com",
};



@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [CommonModule, PersonalInformationComponent,ButtonModule,DialogModule,ExpertiseInfoComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})


export class UserProfileComponent implements OnInit {

    showLogout:Boolean = false

    visible:boolean=false;

    preferenceVisible: boolean = false;

    userProfile:JobSeeker = {} as JobSeeker

   constructor(
    private dataService:DataService,
    private authService:AuthService,
    private router:Router,
    private profileService:ProfileService

   )
   {
 
   }
  ngOnInit(): void {
    this.dataService.setData(true);
    this.userProfile= this.authService.getUserProfileData();
    this.dataService.setDataforheader(true);
  }

  logoutPop()
  { 
      this.showLogout= !this.showLogout
    
  }

  showDialog()
  {
   this.preferenceVisible=true
   this.profileService.setProfileInformation({
    ...this.profileService.getProfileInformation(),
    expertiseInformation: this.userProfile.expertiseInformation
  });

  console.log()
  }


  logout()
  {
    this.authService.logout();
   
  }
  navigatetoPolicy(){
    this.router.navigate(["/privacy-policy"])
  }

  goToProfileInformation()
  {
  
    this.visible=!this.visible;
    // this.router.navigate(["/employee-personalDetails"])
  }

  navigatetoHelpCenter()
  {
    this.router.navigate(["/help-center"])
  }

  share()
  {
   try{
        navigator.share(shareData)
   }
   catch{
   }
  }

}
