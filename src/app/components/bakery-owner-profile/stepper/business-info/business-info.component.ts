import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import { DataService } from '../../../../services/data.service';
import { Users } from '../../../../models/user';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'business-info',
  standalone: true,
  imports: [CardModule,DropdownModule,ButtonModule,FormsModule,CommonModule,CalendarModule,ToastModule],
  templateUrl: './business-info.component.html',
  styleUrl: './business-info.component.scss'
})
export class BusinessInfoComponent  implements OnInit{
  validationErrors: string[] = [];
  constructor(
    private router:Router,
    private profileService:ProfileService,
    private dataService:DataService,
    private messageService:MessageService
  )
  {

  }
  ngOnInit(): void {
    this.dataService.requestExpand('business')
    this.updatedBusinessInfo=this.profileService.getBakeryOwnerProfileInfo().businessInformation
    this.dataService.setData(false)
  
  }
  submitted: boolean = false;
  updatedBusinessInfo = {
    businessName: '',
    businessAddress: '',
    businessPhone:'',
    fssaiLicenseNo:'',
    fssaiExpiryDate:null
  };




  nextPage() {
    const validationErrors = this.validateBusinessInfo();

    if (validationErrors.length === 0) {
      this.profileService.setBakeryOwnerProfileInfo({
        ...this.profileService.getBakeryOwnerProfileInfo(),
        businessInformation: this.updatedBusinessInfo
      });

      this.dataService.setSessionStorageItem('businessPage', true);
      this.router.navigate(['bakeprofile/ownerlocation-info']);
    } else {
      this.showValidationErrors(validationErrors);
    }
  }

  validateBusinessInfo(): string[] {
    const errors: string[] = [];

    if (!this.updatedBusinessInfo.businessName) {
      errors.push('Business Name is required.');
    }

    if (!this.updatedBusinessInfo.businessAddress) {
      errors.push('Business Address is required.');
    }

    if (!this.updatedBusinessInfo.businessPhone) {
      errors.push('Business Phone is required.');
    }

    // if (!this.updatedBusinessInfo.fssaiLicenseNo) {
    //   errors.push('FSSAI License Number is required.');
    // }

    // if (!this.updatedBusinessInfo.fssaiExpiryDate) {
    //   errors.push('FSSAI Expiry Date is required.');
    // }

    return errors;
  }

  showValidationErrors(errors: string[]) {
    errors.forEach(error => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: error });
    });
  }
}
