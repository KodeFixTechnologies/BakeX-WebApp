import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobSeeker } from '../../models/jobSeeker';

const shareData = {
  title: "Bake Joli",
  text: "Join Bake Joli",
  url: "www.bakejoli.com",
};
@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})


export class UserProfileComponent implements OnInit {

    showLogout:Boolean = false

    userProfile:JobSeeker = {} as JobSeeker

   constructor(
    private dataService:DataService,
    private authService:AuthService,
    private router:Router

   )
   {
 
   }
  ngOnInit(): void {
    this.dataService.setData(true);
    this.userProfile= this.authService.getUserProfileData();
    
  }

    logoutPop()
    { 
        this.showLogout= !this.showLogout
        console.log(this.showLogout)
    }


  logout()
  {
    this.authService.logout();
    this.router.navigate([""])
  }
  navigatetoPolicy(){
    this.router.navigate(["/privacy-policy"])
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
