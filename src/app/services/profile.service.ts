import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
      licenseno:'',
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


  constructor() { }
}
