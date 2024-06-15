import { ChangeDetectorRef, Component, NgZone, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button'
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from '../../../../services/data.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { FileService } from '../../../../services/file.service';
import { Users } from '../../../../models/user';
import { CalendarModule } from 'primeng/calendar';
declare const initSendOTP: any;
@Component({
  selector: 'personal-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule,CalendarModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  providers: [BrowserAnimationsModule]
})


export class PersonalInfoComponent {


  updatedPersonalInfo = {
    firstname: '',
    lastname: '',
    age: null,
    gender: '',
    phoneno: ''
  };

  personalInformation: any;

  otpVerified: boolean = false;

  script: any;

  genders: any;

  submitted: boolean = false;

  googleUser: any;

  user:Users = {} as Users;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private render: Renderer2,
    private ngZone: NgZone,
    private fileService: FileService
  ) { 

    
  }

  ngOnInit() {
   
    this.user.isMobileVerified='N';
    this.user.userTypeId=1;
 
    this.dataService.getGoogleData().subscribe((data) => {
      if(data)
        {
          this.googleUser = data;
          this.user.googleId= this.googleUser.sub;
          this.user.authId=1;
          console.log(this.user)
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
      
      
        this.dataService.getPhoneData().subscribe((data)=>{
          console.log(data)
          this.updatedPersonalInfo.phoneno=data;
        })
     
    })


    this.script = this.render.createElement('script');
    this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";

    this.genders = [
      { name: 'Male', code: 'M', factor: 1 },
      { name: 'Female', code: 'F', factor: 2 },
      { name: 'Other', code: 'O', factor: 3 }
    ];
    this.updatedPersonalInfo = this.profileService.getProfileInformation().personalInformation;
   
    this.dataService.getPhoneData().subscribe((data)=>{
      console.log(data)
      this.updatedPersonalInfo.phoneno=data;
    })
    
    console.log(this.updatedPersonalInfo)
    this.dataService.setData(false)

  }

  nextPage() {
    if (this.updatedPersonalInfo.firstname && this.updatedPersonalInfo.lastname && this.updatedPersonalInfo.age) {

      this.profileService.setProfileInformation({
        ...this.profileService.getProfileInformation(),
        personalInformation: this.updatedPersonalInfo
      });

      this.user.isMobileVerified='Y';
      this.user.mobileNumber=this.updatedPersonalInfo.phoneno
            this.dataService.setUserData(this.user);
            console.log(this.user)
             // get verified token in response
             this.ngZone.run(() => {
                this.router.navigate(['profile/location']);


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
      //       console.log(this.user)
      //         // get verified token in response
      //         this.ngZone.run(() => {
      //           this.router.navigate(['profile/location']);


      //       });

      //     },
      //     failure: (error:any) => {
      //         // handle error
      //         console.log('failure reason', error);
      //     },

      //   };

      //   initSendOTP(configuration)
      // }


      this.script.onerror =(error:any)=> {
        console.log("script error",error)
      }
      this.render.appendChild(document.body,this.script)
    }



    // this.router.navigate(['profile/location']);
    // this.submitted = true;




  }

  setGender(event: any) {
    this.updatedPersonalInfo.gender = event.value;
    //  this.profileService.setProfileInformation = this.personalInformation;

  }

}



