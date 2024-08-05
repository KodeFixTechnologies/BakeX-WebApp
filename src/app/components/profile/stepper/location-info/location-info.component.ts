import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../../services/profile.service';
import { QueryService } from '../../../../services/query.service';
import { ButtonModule } from 'primeng/button'
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

import { InputOtpModule } from 'primeng/inputotp';
import { StepperComponent } from '../../../shared/stepper/stepper.component';
import { DataService } from '../../../../services/data.service';

interface State {
  state: string;
  districts: string[];
}
interface StatesData {
  states: State[];
}
export interface DistrictsData {
  state: string;
  districts: string[];
}

@Component({
  selector: 'location-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule,InputOtpModule],
  templateUrl: './location-info.component.html',
  styleUrl: './location-info.component.scss'
})



export class LocationInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(StepperComponent) stepperComponent!: StepperComponent;

  constructor(
    private profileService: ProfileService,
    private queryService: QueryService,
    private router:Router,
   private ref:ChangeDetectorRef,
    private dataService:DataService
  ) {

  }
  ngAfterViewInit(): void {


  }

  updatedlocationInfo = {
    state: '',
    district: '',
    place: '',
    pincode:''
  }

  pincodes:string='';


  // to get the location info from profie service
  value:any;
  states: DistrictsData[]=[];
  submitted: boolean = false;
  districts: any;
  selectedState: DistrictsData | null = null;
  selectedDistrict: any;
  userplace:string=''

  ngOnInit(): void {


    this.dataService.requestExpand('location');
    this.queryService.getLocationData().subscribe((data) => {
      this.states = data.states;
   

      
    this.updatedlocationInfo = this.profileService.getProfileInformation().locationInformation;


    
    if(this.updatedlocationInfo)
    {
     
      this.selectedState = this.states.find((state) => state.state === this.updatedlocationInfo.state) || null;
      this.onStateChange()
      this.selectedDistrict=this.updatedlocationInfo.district
    
     
      this.pincodes=this.updatedlocationInfo.pincode;
      this.userplace=this.updatedlocationInfo.place
    }


    })




   
  }




  onStateChange() {

    this.districts = this.selectedState?.districts.map((district: string) => ({ label: district, value: district }));
   
  }
  nextPage() {

   // this.fileService.uploadObject();


    if (this.selectedState) {
      this.updatedlocationInfo.state = this.selectedState.state;
      this.updatedlocationInfo.district = this.selectedDistrict;
      this.updatedlocationInfo.place=this.userplace
      this.updatedlocationInfo.pincode= this.pincodes;

      this.profileService.setProfileInformation({
        ...this.profileService.getProfileInformation(),
        locationInformation: this.updatedlocationInfo
      });
      this.router.navigate(['profile/expertise']);

      
      this.submitted = true;
    } else {
      console.error('No state selected.');
    }
   }


}
