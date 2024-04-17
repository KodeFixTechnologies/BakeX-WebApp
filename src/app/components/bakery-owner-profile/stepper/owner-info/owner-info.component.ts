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
  )
  {
   
  }

  date:any;

  genders:any;
  ngOnInit(): void {
  
    this.genders = [
      { name: 'Male', code: 'M', factor: 1 },
      { name: 'Female', code: 'F', factor: 2 },
      { name: 'Other', code: 'O', factor: 3 }
  ];
  }


  
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




  setGender(event:any)
  {
    this.updatedPersonalInfo.gender=event.value;
  //  this.profileService.setProfileInformation = this.personalInformation;
  
  }

  nextPage()
  {
    if(this.updatedPersonalInfo.phoneno!='')
    {

    this.script= this.render.createElement('script');
    this.script.src="https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
   
    // Send the 'phoneno' parameter as a query parameter


           this.script.onload=()=>{
     
            var configuration= {
              widgetId: "3464636a4a73333635343731",
              tokenAuth: "418358TlbdIOJ67q660d315aP1",
              identifier: '+91'+this.updatedPersonalInfo.phoneno,
              exposeMethods: "<true | false> (optional)",  // When true will expose the methods for OTP verification. Refer 'How it works?' for more details
              success: (data:any) => {

                console.log('Sucesss')
                  // get verified token in response
                  this.ngZone.run(() => {
                    this.router.navigate(['/ownerview']);
                    this.dataService.setPhoneData(this.updatedPersonalInfo.phoneno)

                   
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
    }

  
}
