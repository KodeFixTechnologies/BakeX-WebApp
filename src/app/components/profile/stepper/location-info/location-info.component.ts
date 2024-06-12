import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { FileService } from '../../../../services/file.service';
import { InputOtpModule } from 'primeng/inputotp';

interface State {
  state: string;
  districts: string[];
}
interface StatesData {
  states: State[];
}

@Component({
  selector: 'location-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule,InputOtpModule],
  templateUrl: './location-info.component.html',
  styleUrl: './location-info.component.scss'
})


export class LocationInfoComponent implements OnInit, AfterViewInit {


  constructor(
    private profileService: ProfileService,
    private queryService: QueryService,
    private router:Router,
    private fileService:FileService,
    private ref:ChangeDetectorRef
  ) {

  }
  ngAfterViewInit(): void {


    console.log(this.selectedState)
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
  states: any;
  submitted: boolean = false;
  districts: any;
  selectedState: any;
  selectedDistrict: any;
  userplace:string=''

  ngOnInit(): void {
    // console.log(this.profileService.profileInformation)
    

   
    this.queryService.getLocationData().subscribe((data) => {
      this.states = data.states;

      
  
      console.log(data.states)
    })

   
    this.queryService.getStateAndDistrict().subscribe((data)=>{
      //console.log(data)
    })

    this.updatedlocationInfo = this.profileService.getProfileInformation().locationInformation;
   
  }

  mapSelectedData() {
    console.log(this.updatedlocationInfo);
    // Check if this.states is defined
    if (this.states && this.updatedlocationInfo.state) {
        // Use the find method if this.states is defined
        this.selectedState = this.states.find((state: { state: string; }) => state.state === this.updatedlocationInfo.state);
        console.log(this.selectedState);
        // Additional logic
    } else {
        console.error('States data is not available.');
    }
}



  onStateChange() {
    console.log(this.selectedState)
    this.districts = this.selectedState.districts.map((district: string) => ({ label: district, value: district }));
    console.log(this.districts)
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
