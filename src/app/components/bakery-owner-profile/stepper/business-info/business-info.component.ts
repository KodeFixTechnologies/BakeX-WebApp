import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
@Component({
  selector: 'business-info',
  standalone: true,
  imports: [CardModule,DropdownModule,ButtonModule,FormsModule,CommonModule,CalendarModule],
  templateUrl: './business-info.component.html',
  styleUrl: './business-info.component.scss'
})
export class BusinessInfoComponent  implements OnInit{

  constructor(
    private router:Router,
    private profileService:ProfileService
  )
  {

  }
  ngOnInit(): void {

    this.updatedBusinessInfo=this.profileService.getBakeryOwnerProfileInfo().businessInformation
  
  }
  submitted: boolean = false;
  updatedBusinessInfo = {
    businessName: '',
    businessAddress: '',
    businessPhone:'',
    fssaiLicenseNo:'',
    fssaiExpiryDate:null
  };



  nextPage()
  {
    this.profileService.setBakeryOwnerProfileInfo({
      ...this.profileService.getBakeryOwnerProfileInfo(),
      businessInformation: this.updatedBusinessInfo
    });


    console.log(this.profileService.getBakeryOwnerProfileInfo())
    this.router.navigate(['bakeprofile/ownerlocation-info']);
  }
}
