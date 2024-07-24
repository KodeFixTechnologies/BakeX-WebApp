import { Component, OnInit } from '@angular/core';
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
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FileService } from '../../../../services/file.service';
import { IBakerOwnerProfile, IBakerOwnerProfileRequest } from '../../../../models/request/BakeOwnerProfileRequest';
import { DataService } from '../../../../services/data.service';
import { Users } from '../../../../models/user';


@Component({
  selector: 'ownerlocation-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule],
  templateUrl: './ownerlocation-info.component.html',
  styleUrl: './ownerlocation-info.component.scss'
})
export class OwnerlocationInfoComponent implements OnInit {



  ngOnInit(): void {
  

    this.dataService.setData(false)

    this.updatedlocationInfo = this.profileService.getBakeryOwnerProfileInfo().locationInformation;
 
    this.queryService.getLocationData().subscribe((data) => {
      this.states = data.states;

 
    })


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
    private fileService: FileService,
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
  states: any;
  submitted: boolean = false;
  districts: any;
  selectedState: any;
  selectedDistrict: any;
  userplace: string = ''

  user: Users = {} as Users;


  onStateChange() {
   
    this.districts = this.selectedState.districts.map((district: string) => ({ label: district, value: district }));
  }
  nextPage() {


    // this.fileService.uploadObject();

    if (this.selectedState) {
      this.updatedlocationInfo.state = this.selectedState.state;
      this.updatedlocationInfo.district = this.selectedDistrict;
      this.updatedlocationInfo.place = this.userplace
      this.updatedlocationInfo.pincode = this.pincodes;
      this.updatedOtherInfo.profileCreateDate = this.currentDate.toLocaleDateString();

      this.profileService.setBakeryOwnerProfileInfo({
        ...this.profileService.getBakeryOwnerProfileInfo(),
        locationInformation: this.updatedlocationInfo,
        otherInformation: this.updatedOtherInfo,
      });

      // this.INonBakeMember = this.profileService.getBakeryOwnerProfileInfo();

      // this.NonBakeMember = this.profileService.setProfileforBackend(this.INonBakeMember);




      this.router.navigate([

                   'bakeprofile/logo'
                ])


    }

    else {
      console.error('No state selected.');
    }


  }


}
