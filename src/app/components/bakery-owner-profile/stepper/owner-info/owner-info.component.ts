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
declare const initSendOTP: any;
@Component({
  selector: 'owner-info',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule,InputTextModule,FormsModule,DialogModule],
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
  )
  {
   
  }
  ngOnInit(): void {
  

  }
  script:any;
  isbakeOwner:boolean=false;
  isNonBakeOwner:boolean=false;
  visible:boolean=false;
  phno:string=''
  title:string='Do You Have a Bake Kerala Membership?'

  setOwner(value:string)
  {
    if(value==='bakemember')
      {
    this.isbakeOwner=true;
    this.isNonBakeOwner=false;
    this.title='Do You Have a Bake Kerala Membership?'
      }
    else
    {
      this.isNonBakeOwner=true;
      this.isbakeOwner=false;
      this.title='Enter Your Personal Information'
    }

  }
  async checkBakeUser(phoneno: string) {
    this.script= this.render.createElement('script');
    this.script.src="https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
    console.log(phoneno);
    // Send the 'phoneno' parameter as a query parameter
    this.queryService.verifyBakeUser({ phoneno: phoneno }).subscribe((response: boolean) => {
      if (response == true) {


           this.script.onload=()=>{
     
            var configuration= {
              widgetId: "3464636a4a73333635343731",
              tokenAuth: "418358TlbdIOJ67q660d315aP1",
              identifier: '+91'+phoneno,
              exposeMethods: "<true | false> (optional)",  // When true will expose the methods for OTP verification. Refer 'How it works?' for more details
              success: (data:any) => {

                console.log('Sucesss')
                  // get verified token in response
                  this.ngZone.run(() => {
                    this.router.navigate(['/ownerview']);
                    this.dataService.setPhoneData(phoneno)

                   
                });
                  
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
        console.log('bak user');
      }
    });
  }

}
