import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';
import { Users } from '../../models/user';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '@codetrix-studio/capacitor-google-auth';
declare const initSendOTP: any;
const googleAuthId = 1;
@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, AfterViewInit {
  googleUser: any;
  user: Users = {} as Users;
  isLogin: boolean = true;

  constructor(
    private ngZone: NgZone,
    private authService: AuthService,
    private render: Renderer2,
    private queryService: QueryService,
    private router: Router,
    private dataService: DataService,
  
    // this is used to send the data from one component to another using rxjs
  ) {

  }

  script: any;
  private tokenKey = 'authToken';
  mobileNumber: string = '';
  checkingMobileNumber: boolean = false;

  ngOnInit() {
    this.loadGoogle();
    this.script = this.render.createElement('script');
    this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";

  }

  loadGoogle() {
    const script = this.render.createElement('script');
    script.src = "https://accounts.google.com/gsi/client"
    script.onload = () => {
      console.log("Script loaded")
    }
    script.onerror = (error: any) => {
      console.log("script error", error)
    }
    this.render.appendChild(document.body, script)

  }

  ngAfterViewInit(): void {
    (window as any)['handleOauthResponse'] = (response: unknown) => {
      const responseObj = response as any;
      if (responseObj && responseObj.credential) {
        const responsePayload = this.decodeJWTToken(responseObj.credential);
        console.log(responsePayload)
        this.googleUser = responsePayload;
        this.dataService.setGoogleData(this.googleUser);
        if (this.googleUser) {
          this.user.authId=1;
          this.user.googleId=this.googleUser.sub;
          this.user.mobileNumber=''
          this.user.isMobileVerified=''
          this.user.password=''
          this.user.id=0;
          this.user.createdAt= new Date
          this.user.userTypeId=1

          if(this.user.googleId!=null)
            {

            }
          this.ngZone.run(() => {

            this.queryService.checkUserExist(this.user).subscribe((response) => {
              console.log("response: ",response);
              if (response == true) {
                  // Wrap the navigation inside NgZone.run()
                  this.ngZone.run(() => {
                      this.router.navigate(['/seeker']);
                      this.dataService.setData(true);
                  });
  
              }else{
                  // Wrap the navigation inside NgZone.run()
                  this.ngZone.run(() => {
                    this.router.navigate(['/home']);
                    this.dataService.setData(true);
                });
              }
  
          })
        
         
          });
        }


      } else {
        console.error("invalid format", response)
      }
    }
  }



  checkMobileNumber() {
    if (this.mobileNumber.length === 10) {
      this.checkingMobileNumber = true;

      // this.queryService.verifyBakeUser({ phoneno: this.mobileNumber }).subscribe((response => {
      //   if (response == true) {
      //     this.checkingMobileNumber = false;
      //     this.otpVerification()
      //   }

      // }))

    }
  }

  signupClick() {
    this.isLogin = !this.isLogin;
    this.loadGoogle()
  }

  decodeJWTToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }


  otpVerification() {
    this.script.onload = () => {

      var configuration = {
        widgetId: "3464636a4a73333635343731",
        tokenAuth: "418358TlbdIOJ67q660d315aP1",
        identifier: '+91' + this.mobileNumber,
        exposeMethods: "<true | false> (optional)",  // When true will expose the methods for OTP verification. Refer 'How it works?' for more details
        success: (data: any) => {
          // get verified token in response
          this.ngZone.run(() => {
            this.router.navigate(['/home']);


          });

        },
        failure: (error: any) => {
          // handle error
          console.log('failure reason', error);
        },

      };

      initSendOTP(configuration)
    }


    this.script.onerror = (error: any) => {
      console.log("script error", error)
    }
    this.render.appendChild(document.body, this.script)
  }


  SignUp()
  {
    this.user.authId=2
    this.user.isMobileVerified=''
    this.user.id=0
    this.user.createdAt= new Date
    this.user.userTypeId=1
    this.dataService.setUserData(this.user)
  
    this.queryService.checkUserExist(this.user).subscribe((response) => {
      console.log("response: ",response);
      if (response == true) {
          // Wrap the navigation inside NgZone.run()
          this.ngZone.run(() => {
              this.router.navigate(['/seeker']);
              this.dataService.setData(true);
          });

      }else{

          // Wrap the navigation inside NgZone.run()
          this.ngZone.run(() => {
            this.dataService.setPhoneData(this.user.mobileNumber);
            this.router.navigate(['/home']);
            this.dataService.setData(true);
        });
      }

  })
  }


  gotoOtp()
 {
  this.dataService.setPhoneData(this.user.mobileNumber);
  this.router.navigate(['/otp']);
 }

  logIn(){

    this.user.authId=2
    this.user.isMobileVerified=''
    this.user.id=0
    this.user.createdAt= new Date
    this.user.userTypeId=0
    this.dataService.setUserData(this.user)

     

    this.authService.checkUserExist(this.user).subscribe((response) => {
      console.log("response: ",response);
      if (response.token) {
        this.authService.setToken(response.token);
       let profileId =  this.authService.getUserIdFromToken()
        let userTypeId = this.authService.getUserTypeId() 
     
        if(userTypeId==1)
            {

              this.ngZone.run(() => {
                this.router.navigate(['/seeker']);
                this.dataService.setData(true);
            });
            }
          // Wrap the navigation inside NgZone.run()
       else {

        this.router.navigate(['/ownerview']);
       }

      }

  })

  }
}