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
import { IBakerOwnerProfileRequest } from '../../../../models/request/BakeOwnerProfileRequest';


@Component({
  selector: 'ownerlocation-info',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, CardModule, DropdownModule],
  templateUrl: './ownerlocation-info.component.html',
  styleUrl: './ownerlocation-info.component.scss'
})
export class OwnerlocationInfoComponent implements OnInit{



  ngOnInit(): void {
    // console.log(this.profileService.profileInformation)
    
    this.updatedlocationInfo = this.profileService.getBakeryOwnerProfileInfo().locationInformation;
    console.log(this.updatedlocationInfo)
    this.queryService.getLocationData().subscribe((data) => {
      this.states = data.states;
  
      console.log(data.states)
    })

   
    this.queryService.getStateAndDistrict().subscribe((data)=>{
      //console.log(data)
    })
  }



  constructor(
    private profileService: ProfileService,
    private queryService: QueryService,
    private router:Router,
    private fileService:FileService
  ) {
   this.currentDate = new Date();
  }
  updatedlocationInfo = {
    state: '',
    district: '',
    place: '',
    pincode:''
  }


  updatedOtherInfo = {
    profileCreateDate : ''
  }

  NonBakeOwner: IBakerOwnerProfileRequest = {} as IBakerOwnerProfileRequest;
  pincodes:any
  currentDate:Date;
  states: any;
  submitted: boolean = false;
  districts: any;
  selectedState: any;
  selectedDistrict: any;
  userplace:string=''


  
  onStateChange() {
    console.log(this.selectedState)
    this.districts = this.selectedState.districts.map((district: string) => ({ label: district, value: district }));
  }
  nextPage() {
   
    console.log(this.pincodes)
   // this.fileService.uploadObject();

    if (this.selectedState) {
      this.updatedlocationInfo.state = this.selectedState.state;
      this.updatedlocationInfo.district = this.selectedDistrict;
      this.updatedlocationInfo.place=this.userplace
      this.updatedlocationInfo.pincode=this.pincodes;
      this.updatedOtherInfo.profileCreateDate=this.currentDate.toLocaleDateString();
      
      this.profileService.setBakeryOwnerProfileInfo({
        ...this.profileService.getBakeryOwnerProfileInfo(),
        locationInformation: this.updatedlocationInfo,
        otherInformation: this.updatedOtherInfo,
      });
      
    this.NonBakeOwner= this.profileService.getBakeryOwnerProfileInfo();


     console.log(this.NonBakeOwner)
      this.queryService.createNonBakeryowner(this.NonBakeOwner).subscribe((response)=>{
        
        if(response==true)
          {
            this.router.navigate([
            
            '/ownerview'
            ])
          }
      })
      this.submitted = true;
    } else {
      console.error('No state selected.');
    }
   }


}
