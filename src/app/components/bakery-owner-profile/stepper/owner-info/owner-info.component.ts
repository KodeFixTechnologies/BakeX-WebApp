import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { QueryService } from '../../../../services/query.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ProfileService } from '../../../../services/profile.service';
import { Users } from '../../../../models/user';
declare const initSendOTP: any;
@Component({
  selector: 'owner-info',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule,InputTextModule,FormsModule,DialogModule,DropdownModule,CalendarModule],
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.scss',
})
export class OwnerInfoComponent implements OnInit{


  constructor(
    private queryService:QueryService,
    private render:Renderer2,
    private ngZone:NgZone,
    private router:Router,
    private dataService:DataService,
    private profileService:ProfileService
  )
  {
   
  }
  googleUser: any;
  date:any;
  user:Users = {} as Users;
  

  genders:any;
  ngOnInit(): void {
   

    this.user.isMobileVerified='N';
    this.user.userTypeId=2;

    this.dataService.getGoogleData().subscribe((data) => {
      if(data)
        {
          this.googleUser = data;
          this.user.googleId= this.googleUser.sub;
          this.user.authId=1;
        
        }
        else if(this.user.password) {

          this.dataService.getUserData().subscribe((data)=>{
            this.user.password=data.password
            this.user.authId=2; // 
            this.updatedPersonalInfo.phoneno= data.mobileNumber;
          })
        }
        else {
          this.user.authId=3
   
        }
     
    })
    this.updatedPersonalInfo=this.profileService.getBakeryOwnerProfileInfo().personalInformation

    
    this.dataService.getPhoneData().subscribe((data)=>{
      this.updatedPersonalInfo.phoneno = data
    })
 

    this.genders = [
      { name: 'Male', code: 'M', factor: 1 },
      { name: 'Female', code: 'F', factor: 2 },
      { name: 'Other', code: 'O', factor: 3 }
  ];

  this.dataService.setData(false);


  this.script = this.render.createElement('script');
  this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
  }

  gender:string=''
  
  updatedPersonalInfo = {
    firstname: '',
    lastname: '',
    age: null,
    gender: '',
    phoneno:''
  };

  submitted:boolean=false;
  script:any;
  isbakeOwner:boolean=false;
  isNonBakeOwner:boolean=false;
  visible:boolean=false;
  phno:string=''
  title:string='Enter Your Personal information'






  // setGender(event: any)
  // {

  //   // this.gender=event.value.name;
  //   // this.updatedPersonalInfo.gender=event.value.name
  //   console.log('Selected gender:', this.updatedPersonalInfo.gender);

  // //  this.profileService.setProfileInformation = this.personalInformation;
  
  // }


  nextPage()
  {
    
    this.profileService.setBakeryOwnerProfileInfo({
      ...this.profileService.getBakeryOwnerProfileInfo(),
      personalInformation: this.updatedPersonalInfo
    });

    this.user.isMobileVerified='Y';

          this.user.mobileNumber=this.updatedPersonalInfo.phoneno
          this.dataService.setUserData(this.user);

          this.dataService.setPhoneData(this.updatedPersonalInfo.phoneno)

           // get verified token in response
            this.ngZone.run(() => {
               this.router.navigate(['bakeprofile/business-info']);

              });

    // if (this.script) {
    //   this.render.removeChild(document.body, this.script);
    // }

    // this.script = this.render.createElement('script');
    // this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";

    //  this.script.onload=()=>{

    //  var configuration= {
    //     widgetId: "3464636a4a73333635343731",
    //     tokenAuth: "418358TlbdIOJ67q660d315aP1",
    //     identifier: '+91'+ this.updatedPersonalInfo.phoneno,
    //     exposeMethods: "<true | false> (optional)",  // When true will expose the methods for OTP verification. Refer 'How it works?' for more details
    //     success: (data:any) => {
    //       this.user.isMobileVerified='Y';
    //       this.user.mobileNumber=this.updatedPersonalInfo.phoneno
    //       this.dataService.setUserData(this.user);
    //     
    //         // get verified token in response
    //         this.ngZone.run(() => {
    //           this.router.navigate(['bakeprofile/business-info']);

    //       });

    //     },
    //     failure: (error:any) => {
    //         // handle error

    //     },

    //   };

    //   initSendOTP(configuration)
    // }


    this.script.onerror =(error:any)=> {

    }
    this.render.appendChild(document.body,this.script)
  


    
  }

  seeGender(event: any) {
    // event.value contains the selected value
    const selectedGender = this.genders.find((g:any) => g.name === event.value.name);
    this.updatedPersonalInfo.gender = selectedGender?selectedGender.name : '';
    console.log('Updated personal info:', this.updatedPersonalInfo);
    console.log('Selected gender:', event.value); // or this.updatedPersonalInfo.gender
    
  }
  
}
