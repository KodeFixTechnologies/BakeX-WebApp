import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

declare const initSendOTP: any;
declare const window: any;

@Component({
  selector: 'otp',
  standalone: true,
  imports: [InputOtpModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit, AfterViewInit {

  phoneno: string = '';
  otpValue: string = '';
  script: any;

  constructor(
    private renderer: Renderer2,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.script = this.renderer.createElement('script');
    this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";

    this.dataService.getPhoneData().subscribe((data) => {
      this.phoneno = data;
      console.log(data);
      this.sendOtp();  // Automatically send OTP when phone number is obtained
    });
  }

  ngAfterViewInit(): void {
    this.script.onload = () => {
      const configuration = {
        widgetId: "3464636a4a73333635343731",
        tokenAuth: "418358TlbdIOJ67q660d315aP1",
        identifier: this.phoneno,
        exposeMethods: true,
        success: (data: any) => {
          console.log('success response', data);
        },
        failure: (error: any) => {
          console.log('failure reason', error);
        },
      };

      initSendOTP(configuration);
    };

    this.script.onerror = (error: any) => {
      console.log("script error", error);
    };

    this.renderer.appendChild(document.body, this.script);
  }

  sendOtp() {
    if (this.phoneno) {
      window.sendOtp(
        this.phoneno,
        (data: any) => console.log('OTP sent successfully.', data),
        (error: any) => console.log('Error occurred', error)
      );
    }
  }

  verifyOtp() {
    if (this.otpValue) {
      console.log(this.otpValue)
      window.verifyOtp(
        this.otpValue,
        (data: any) => console.log('OTP verified:', data),
        (error: any) => console.log('Error occurred', error)
      );
    }
  }
}
