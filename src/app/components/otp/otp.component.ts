import { AfterViewInit, Component, NgZone, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../services/data.service';
import { InputOtpModule } from 'primeng/inputotp';
import { Users } from '../../models/user';
import { Router } from '@angular/router';

declare const initSendOTP: any;


@Component({
  selector: 'otp',
  standalone: true,
  imports: [InputOtpModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit, AfterViewInit {

  constructor(
    private render:Renderer2,
    private dataService:DataService,
    private ngZone: NgZone,
    private router : Router
  ) { }


  ngAfterViewInit(): void {
    this.script.onload=()=>{
     
      var configuration= {
        widgetId: "3464636a4a73333635343731",
        tokenAuth: "418358TlbdIOJ67q660d315aP1",
        identifier: '+91'+this.phoneno,
        exposeMethods: "<true | false> (optional)",  // When true will expose the methods for OTP verification. Refer 'How it works?' for more details
        success: (data:any) => {
            // get verified token in response
            console.log('success response', data);

            if(data)
              {
                if(this.user.userTypeId==1)
                  {
                    this.ngZone.run(() => {
                      this.router.navigate(['/profile']);
                      this.dataService.setData(true);
                  });
        
                  }
                  else {
                    this.ngZone.run(() => {
                      this.dataService.setPhoneData(this.phoneno);
                      this.router.navigate(['/bakeprofile']);
                      this.dataService.setData(true);
                  });

                  }
              }
        },
        failure: (error:any) => {
            // handle error
            console.log('failure reason', error);
        },
      
      };
     
      initSendOTP(configuration)
    }
    this.script.onerror =(error:any)=> {
      console.log("script error",error)
    }
    this.render.appendChild(document.body,this.script)
  }

   phoneno:string='';
   script:any;
   user:Users = {} as Users
   

  ngOnInit() {
    
    this.script = this.render.createElement('script');
    this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
    
    this.dataService.getPhoneData().subscribe((data)=>{
      this.phoneno=data;
      console.log(data)
    })

    this.dataService.setPhoneData(this.phoneno);


    this.dataService.getUserData().subscribe((data)=>{
      this.user=data;
    })
   
   
    
  }






  
  
}
