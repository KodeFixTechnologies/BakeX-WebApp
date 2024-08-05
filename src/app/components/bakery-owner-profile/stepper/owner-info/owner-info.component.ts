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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
declare const initSendOTP: any;
@Component({
  selector: 'owner-info',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule,InputTextModule,FormsModule,DialogModule,DropdownModule,CalendarModule,ToastModule],
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
    private profileService:ProfileService,
    private messageService:MessageService,
  )
  {
  
  }
  googleUser: any;
  date:any;
  user:Users = {} as Users;
  isComeback:boolean=true;
  updatedPersonalInfo = {
    firstname: '',
    lastname: '',
    age: '',
    gender: '',
    phoneno:''
  };
  selectedDate:any;
calenderAge:any;
  genders:any;
  ngOnInit(): void {


    this.dataService.requestExpand('profile')
   
    this.dataService.getError().subscribe((data)=>{
      this.isComeback=data;
      if(this.isComeback)
      {
        this.show()
      }
    })
   
     
     


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
    
  

   
    this.user= this.dataService.getSessionStorageItem('ownerData');
 
 
  


       
      



    this.genders = [
      { name: 'Male', code: 'M', factor: 1 },
      { name: 'Female', code: 'F', factor: 2 },
      { name: 'Other', code: 'O', factor: 3 }
  ];


  this.updatedPersonalInfo=this.profileService.getBakeryOwnerProfileInfo().personalInformation
  this.updatedPersonalInfo.phoneno=this.user.mobileNumber;
  if(this.updatedPersonalInfo.gender!='')
    {
      this.setGender(this.updatedPersonalInfo.gender)
    }

  this.dataService.setData(false);


  this.script = this.render.createElement('script');
  this.script.src = "https://control.msg91.com/app/assets/otp-provider/otp-provider.js";
  }

  gender:string=''
  

  show() {
    this.messageService.add({ key:'tc', severity: 'error', summary: 'Error', detail: 'Please Start Agian' });
}

  submitted:boolean=false;
  script:any;
  isbakeOwner:boolean=false;
  isNonBakeOwner:boolean=false;
  visible:boolean=false;
  phno:string=''
  title:string='Enter Your Personal information'








  nextPage()
  {

    this.profileService.setBakeryOwnerProfileInfo({
      ...this.profileService.getBakeryOwnerProfileInfo(),
      personalInformation: this.updatedPersonalInfo
    });

    this.user.isMobileVerified='Y';

          this.dataService.setSessionStorageItem('ownerData',this.user);
       
           // get verified token in response
            this.ngZone.run(() => {
               this.router.navigate(['bakeprofile/business-info']);

              });




    this.script.onerror =(error:any)=> {

    }
    this.render.appendChild(document.body,this.script)
  


    
  }

  setGender(data:string)
  {
    this.gender = this.genders.find((g:any) => g.name === data);
    
 
  
  }

  seeGender(event: any) {
    // event.value contains the selected value
    const selectedGender = this.genders.find((g:any) => g.name === event.value.name);
    this.updatedPersonalInfo.gender = selectedGender?selectedGender.name : '';
 
    
  }
  
}
