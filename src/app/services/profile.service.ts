
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IBakerOwnerProfile, IBakerOwnerProfileRequest } from '../models/request/BakeOwnerProfileRequest';
import { Education, Expertise } from '../models/expertise';
import { Employment, Experience } from '../models/experience';
import { Injectable } from '@angular/core';

export interface ProfileInformation {
  personalInformation: {
    firstname: string;
    lastname: string;
    age: number | null;
    gender: string;
    phoneno: string;
  };
  locationInformation: {
    state: string;
    district: string;
    place: string;
    pincode: string;
  };
  expertiseInformation: Expertise[]; // Changed to Expertise[]
  educationInformation: Education[]
  employmentInformation: Employment[]
  experienceInformation: Experience[]
}

export interface OwnerInformation {
  personalInformation: {
    firstname: string;
    lastname: string;
    age: number | null;
    gender: string;
    phoneno: string;
  };
  locationInformation: {
    state: string;
    district: string;
    place: string;
    pincode: string;
  };
  businessInformation:{
    businessName:string,
    businessAddress:string,
    businessPhone:string,
    fssaiLicenseNo:string,
    fssaiExpiry:null
  };
  otherInformation:{
    profileCreateDate:null
  };

}


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileInformationSubject = new BehaviorSubject<ProfileInformation>({
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
    expertiseInformation: [],
    educationInformation:[],
    employmentInformation: [],
    experienceInformation:[]
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
  private bakeryOwnerProfileInfoSubject = new BehaviorSubject<OwnerInformation>({
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
    this.nonBakeMember.creationProfileImage = value.otherInformation.ProfileImage

    return this.nonBakeMember;
}


  constructor() { }
}
