import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

declare const initSendOTP: any;


@Component({
  selector: 'otp',
  standalone: true,
  imports: [InputOtpModule,FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit, AfterViewInit {

  constructor(
    private render:Renderer2,
    private dataService:DataService
  ) { }


  ngAfterViewInit(): void {
    this.script.onload=()=>{
     
      var configuration= {
        widgetId: "3464636a4a73333635343731",
        tokenAuth: "418358TlbdIOJ67q660d315aP1",
        identifier: '',
        exposeMethods: "<true | false> (optional)",  // When true will expose the methods for OTP verification. Refer 'How it works?' for more details
        success: (data:any) => {
            // get verified token in response
            console.log('success response', data);
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
   
   

  ngOnInit() {

    this.dataService.getPhoneData().subscribe((data)=>{
      this.phoneno=data;
      console.log(data)
    })
   
   
    
  }







  
  
}
