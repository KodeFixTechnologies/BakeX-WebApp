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

  date:any;

  genders:any;
  ngOnInit(): void {
   
    this.updatedPersonalInfo=this.profileService.getBakeryOwnerProfileInfo().personalInformation

    this.genders = [
      { name: 'Male', code: 'M', factor: 1 },
      { name: 'Female', code: 'F', factor: 2 },
      { name: 'Other', code: 'O', factor: 3 }
  ];
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





  setGender(event:any)
  {

    this.gender=event.value;
    this.updatedPersonalInfo.gender=event.value.name
   
  //  this.profileService.setProfileInformation = this.personalInformation;
  
  }

  nextPage()
  {
    
    this.profileService.setBakeryOwnerProfileInfo({
      ...this.profileService.getBakeryOwnerProfileInfo(),
      personalInformation: this.updatedPersonalInfo
    });
    this.router.navigate(['bakeprofile/business-info']);
  }
  
}
