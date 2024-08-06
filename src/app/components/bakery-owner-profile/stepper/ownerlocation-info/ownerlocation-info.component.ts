import { Component, NgZone, OnInit } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { QueryService } from '../../../../services/query.service';
import { ButtonModule } from 'primeng/button'
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

import { IBakerOwnerProfile, IBakerOwnerProfileRequest } from '../../../../models/request/BakeOwnerProfileRequest';
import { DataService } from '../../../../services/data.service';
import { Users } from '../../../../models/user';
import { DistrictsData } from '../../../profile/stepper/location-info/location-info.component';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'ownerlocation-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule,ToastModule],
  templateUrl: './ownerlocation-info.component.html',
  styleUrl: './ownerlocation-info.component.scss'
})
export class OwnerlocationInfoComponent implements OnInit {



  ngOnInit(): void {
  
    this.dataService.requestExpand('location')
    this.queryService.getLocationData().subscribe((data) => {
      this.states = data.states;

 
      this.updatedlocationInfo = this.profileService.getBakeryOwnerProfileInfo().locationInformation;

      if(this.updatedlocationInfo)
        {
         
          this.selectedState = this.states.find((state) => state.state === this.updatedlocationInfo.state) || null;
          this.onStateChange()
          this.selectedDistrict=this.updatedlocationInfo.district
        
         
          this.pincodes=this.updatedlocationInfo.pincode;
          this.userplace=this.updatedlocationInfo.place
        }
  
    })

    this.dataService.setData(false)




    this.queryService.getStateAndDistrict().subscribe((data) => {
    
    })

    this.dataService.getUserData().subscribe((data) => {
      this.user = data;


    })
  }



  constructor(
    private profileService: ProfileService,
    private queryService: QueryService,
    private router: Router,
    private messageService:MessageService,
    private ngZone: NgZone,
    private dataService: DataService
  ) {
    this.currentDate = new Date();
  }
  updatedlocationInfo = {
    state: '',
    district: '',
    place: '',
    pincode: ''
  }


  updatedOtherInfo = {
    profileCreateDate: ''
  }

  INonBakeMember: IBakerOwnerProfile = {} as IBakerOwnerProfile;
  NonBakeMember: IBakerOwnerProfileRequest = {} as IBakerOwnerProfileRequest;
  pincodes: any
  currentDate: Date;
  states: DistrictsData[]=[];
  submitted: boolean = false;
  districts: any;
  selectedState: DistrictsData | null = null;
  selectedDistrict: any;
  userplace: string = ''

  user: Users = {} as Users;


  onStateChange() {
   
    this.districts = this.selectedState?.districts.map((district: string) => ({ label: district, value: district }));
  }
   nextPage() {
    const validationErrors = this.validateLocationInfo();

    if (validationErrors.length === 0) {
      if (this.selectedState) {
        this.updatedlocationInfo.state = this.selectedState.state;
        this.updatedlocationInfo.district = this.selectedDistrict;
        this.updatedlocationInfo.place = this.userplace;
        this.updatedlocationInfo.pincode = this.pincodes;
        this.updatedOtherInfo.profileCreateDate = this.currentDate.toLocaleDateString();

        this.profileService.setBakeryOwnerProfileInfo({
          ...this.profileService.getBakeryOwnerProfileInfo(),
          locationInformation: this.updatedlocationInfo,
          otherInformation: this.updatedOtherInfo,
        });

        this.ngZone.run(() => {
          this.router.navigate(['bakeprofile/logo']);
        });
      }
    } else {
      this.showValidationErrors(validationErrors);
    }
  }

  validateLocationInfo(): string[] {
    const errors: string[] = [];

    if (!this.selectedState || !this.selectedState.state) {
      errors.push('State is required.');
    }

    if (!this.selectedDistrict) {
      errors.push('District is required.');
    }

    if (!this.userplace) {
      errors.push('Place is required.');
    }

    if (!this.pincodes) {
      errors.push('Pincode is required.');
    }

    return errors;
  }

  showValidationErrors(errors: string[]) {
    errors.forEach(error => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: error });
    });
  }


}
