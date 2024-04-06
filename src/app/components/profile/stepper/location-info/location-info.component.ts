import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'location-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule],
  templateUrl: './location-info.component.html',
  styleUrl: './location-info.component.scss'
})
export class LocationInfoComponent implements OnInit {


  constructor(
    private profileService: ProfileService,
    private queryService: QueryService,
    private router:Router,
    private fileService:FileService
  ) {

  }

  updatedlocationInfo = {
    state: '',
    district: '',
    place: '',
  }



  // to get the location info from profie service
  states: any;
  submitted: boolean = false;
  districts: any;
  selectedState: any;
  selectedDistrict: any;
  userplace:string=''

  ngOnInit(): void {
    // console.log(this.profileService.profileInformation)
    this.updatedlocationInfo = this.profileService.getProfileInformation().locationInformation;
    console.log(this.updatedlocationInfo)
    this.queryService.getLocationData().subscribe((data) => {
      this.states = data.states;
  
      console.log(data.states)
    })

   
    this.queryService.getStateAndDistrict().subscribe((data)=>{
      console.log(data)
    })
  }


  onStateChange() {
    console.log(this.selectedState)
    this.districts = this.selectedState.districts.map((district: string) => ({ label: district, value: district }));
  }
  nextPage() {

   // this.fileService.uploadObject();

    if (this.selectedState) {
      this.updatedlocationInfo.state = this.selectedState.state;
      this.updatedlocationInfo.district = this.selectedDistrict;
      this.updatedlocationInfo.place=this.userplace

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
