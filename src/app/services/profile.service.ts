import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IBakerOwnerProfile, IBakerOwnerProfileRequest } from '../models/request/BakeOwnerProfileRequest';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileInformationSubject = new BehaviorSubject<any>({
    personalInformation: {
      firstname: '',
      lastname: '',
      age: null,
      gender: '',
      phoneno:''
    },
    locationInformation: {
      state: '',
      district: '',
      place: '',
      pincode:''
    },
    expertiseInformation: {
      types: null,
    },
    educationInformation:{
      types:null,
    },
    employmentInformation: {
      types: null
    },
    experienceInformation:{
      types:null
    }
  });


   nonBakeMember:IBakerOwnerProfileRequest= {} as IBakerOwnerProfileRequest;


   profileInformation$: Observable<any> = this.profileInformationSubject.asObservable();


 


   getProfileInformation(): any {
    return this.profileInformationSubject.getValue();
  }

 
  setProfileInformation(profileInformation: any): void {
    this.profileInformationSubject.next(profileInformation);
  }


  //Bakery Owner Profile Information Subject
  private bakeryOwnerProfileInfoSubject = new BehaviorSubject<any>({
    personalInformation: {
      firstname: '',
      lastname: '',
      age: null,
      gender: '',
      phoneno:''
    },
    locationInformation: {
      state: '',
      district: '',
      place: '',
      pincode:'',
    },
    businessInformation:{
      businessName:'',
      businessAddress:'',
      businessPhone:'',
      fssaiLicenseNo:'',
      fssaiExpiry:null
    },
    otherInformation:{
      profileCreateDate:null
    }
  
    
  }
);
  
  bakeryOwnerProfileInfo$: Observable<any> = this.bakeryOwnerProfileInfoSubject.asObservable();
  
  private paymentCompleteSubject = new BehaviorSubject<any>(null);
  paymentComplete$: Observable<any> = this.paymentCompleteSubject.asObservable();
  
  getBakeryOwnerProfileInfo(): any {
    return this.bakeryOwnerProfileInfoSubject.getValue();
  }
  
  setBakeryOwnerProfileInfo(profileInformation: any): void {
    this.bakeryOwnerProfileInfoSubject.next(profileInformation);
  }

  setProfileforBackend(value: IBakerOwnerProfile) {

    console.log(value);
    // Assign personal information

    this.nonBakeMember.firstname = value.personalInformation.firstname;
    this.nonBakeMember.lastname = value.personalInformation.lastname;
    this.nonBakeMember.age = value.personalInformation.age;
    this.nonBakeMember.gender = value.personalInformation.gender;
    this.nonBakeMember.phoneno = value.personalInformation.phoneno;

    // Assign location information
    this.nonBakeMember.state = value.locationInformation.state;
    this.nonBakeMember.district = value.locationInformation.district;
    this.nonBakeMember.place = value.locationInformation.place;
    this.nonBakeMember.pincode = value.locationInformation.pincode;

    // Assign business information
    this.nonBakeMember.businessName = value.businessInformation.businessName;
    this.nonBakeMember.businessAddress = value.businessInformation.businessAddress;
    this.nonBakeMember.fssaiLicenseNo = value.businessInformation.fssaiLicenseNo;
    this.nonBakeMember.fssaiExpiryDate = value.businessInformation.fssaiExpiryDate;
    this.nonBakeMember.businessPhone = value.businessInformation.businessPhone;

    // Assign other information
    this.nonBakeMember.profileCreateDate = value.otherInformation.profileCreateDate;

    return this.nonBakeMember;
}


  constructor() { }
}
