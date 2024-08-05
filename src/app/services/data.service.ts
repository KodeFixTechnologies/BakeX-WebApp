import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserProfile, Users } from '../models/user';
import { Jobpost } from '../models/job';
import { BakeMember } from '../models/bakeMember';
import { RecommendedJob } from '../models/recommendedJobs';
import { JobSeeker } from '../models/jobSeeker';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<boolean>(false);
  private errorSubject= new BehaviorSubject<boolean>(false);
  public dataheaderSubject = new BehaviorSubject<boolean>(false);
  private createJobSubject = new BehaviorSubject<boolean>(false);

  private phoneData = new BehaviorSubject<string>('');

  private googleUser = new BehaviorSubject<any>(null);

  private showDialogSource = new Subject<void>();


  private userSubject = new BehaviorSubject<any>(null);

  private jobSubject = new BehaviorSubject<any>(null);

  private bakeOwnersubject = new BehaviorSubject<any>(null);

  private bakeOwnerSessionsubject = new BehaviorSubject<any>(null);

  private displayImage = new BehaviorSubject<any>(null);

  private seekerJobSubject = new BehaviorSubject<any>(null);

   private businessJobSubject = new BehaviorSubject<any>(null);

   private profileDataSubject = new BehaviorSubject<any>(null);

  showDialog$ = this.showDialogSource.asObservable();

  
  private toggleExpandSource = new Subject<string>();
  toggleExpand$ = this.toggleExpandSource.asObservable();

  requestExpand(data: string) {
    this.toggleExpandSource.next(data);
  }


  openDialog() {
    this.showDialogSource.next();
  }

  setBusinessData(business:any)
  {
    this.businessJobSubject.next(business);
  }
 
  getBusinessData()
  {
    return this.businessJobSubject.asObservable();
  }

  setProfileData(profile:JobSeeker)
  {
    this.profileDataSubject.next(profile)
  }

  getProfileData()
  {
   return this.profileDataSubject.asObservable();
  }
 
  setSeekerJobData(data:RecommendedJob)
  {
    this.seekerJobSubject.next(data);
  }

  getSeekerJobData()
  {
    return this.seekerJobSubject.asObservable();
  }

  setJobData(data: boolean) {
    this.createJobSubject.next(data);
  }

  getJobData() {
    return this.createJobSubject.asObservable();
  }

  setData(data: boolean) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }

 setError(data: boolean)
 {
  this.errorSubject.next(data);
 }

 getError()
 {
  return this.errorSubject.asObservable();
 }
  
  setDataforheader(data: boolean) {
    this.dataheaderSubject.next(data);
  }

  getDataforHeader() {
    return this.dataheaderSubject.asObservable();
  }

  
  setGoogleData(data:any)
  {
    this.googleUser.next(data);
  }

  getGoogleData()
  {
    return this.googleUser.asObservable();
  }
  
  setPhoneData(data: string) {
    this.phoneData.next(data);
  }

  getPhoneData() {
    return this.phoneData.asObservable();
  }



  setPostedJobData(data:Jobpost[])
  {
  
    this.jobSubject.next(data);
    this.setSessionStorageItem('jobPosts', data);
  }

  getPostedJobData()
  {
    return this.jobSubject.asObservable();
  }

  setOwnerSessionData(data:Users)
  {
       this.bakeOwnerSessionsubject.next(data);
       this.setSessionStorageItem('ownerSession',data);
  }
  
  setBakeryOwnerData(data:BakeMember)
  {
    this.bakeOwnersubject.next(data);
    this.setSessionStorageItem('bakeMember', data);
  }

  getBakeryOwnerData()
  {
    return this.bakeOwnersubject.asObservable();
  }

  setImage(data:string)
  {
    this.displayImage.next(data);
    this.setSessionStorageItem('displayImage', data);
  }

  getImage()
  {
    return this.displayImage.asObservable();
  }





  setUserData(data:Users)
  {
    this.userSubject.next(data);
  }

  getUserData()
  {
    return this.userSubject.asObservable();
  }
  public setSessionStorageItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public getSessionStorageItem(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  constructor() { 

    const storedJobPosts = this.getSessionStorageItem('jobPosts');
    if (storedJobPosts) {
      this.jobSubject.next(storedJobPosts);
    }
  
    // Initialize bakeOwnersubject from sessionStorage
    const storedBakeMember = this.getSessionStorageItem('bakeMember');
    if (storedBakeMember) {
      this.bakeOwnersubject.next(storedBakeMember);
    }
  
    // Initialize displayImage from sessionStorage
    const storedDisplayImage = this.getSessionStorageItem('displayImage');
    if (storedDisplayImage) {
      this.displayImage.next(storedDisplayImage);
    }
  }
}
