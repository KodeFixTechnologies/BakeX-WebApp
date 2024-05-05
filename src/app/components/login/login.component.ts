import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';
import { Users } from '../../models/user';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  user: any;
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
          this.ngZone.run(() => {
          
            this.router.navigate(['/home']);
         
          });
        }

        // this.queryService.insertUser(user).subscribe((response) => {
        //     console.log("response: ",response);
        //     if (response == true) {
        //         // Wrap the navigation inside NgZone.run()
        //         this.ngZone.run(() => {
        //             this.router.navigate(['/home']);
        //             this.dataService.setData(true);
        //         });

        //     }else{
        //         // Wrap the navigation inside NgZone.run()
        //         this.ngZone.run(() => {
        //           this.router.navigate(['/home']);
        //           this.dataService.setData(true);
        //       });
        //     }

        // })
      } else {
        console.error("invalid format", response)
      }
    }
  }



  checkMobileNumber() {
    if (this.mobileNumber.length === 10) {
      this.checkingMobileNumber = true;

      this.queryService.verifyBakeUser({ phoneno: this.mobileNumber }).subscribe((response => {
        if (response == true) {
          this.checkingMobileNumber = false;
          this.otpVerification()
        }

      }))

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
}