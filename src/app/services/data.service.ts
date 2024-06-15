import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../models/user';
import { Jobpost } from '../models/job';
import { BakeMember } from '../models/bakeMember';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<boolean>(false);
 

  private createJobSubject = new BehaviorSubject<boolean>(false);

  private phoneData = new BehaviorSubject<string>('');

  private googleUser = new BehaviorSubject<any>(null);

  private showDialogSource = new Subject<void>();


  private userSubject = new BehaviorSubject<any>(null);

  private jobSubject = new BehaviorSubject<any>(null);

  private bakeOwnersubject = new BehaviorSubject<any>(null);

  private displayImage = new BehaviorSubject<any>(null);

  showDialog$ = this.showDialogSource.asObservable();

  openDialog() {
    this.showDialogSource.next();
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
    console.log(data)
    this.jobSubject.next(data);
    this.setSessionStorageItem('jobPosts', data);
  }

  getPostedJobData()
  {
    return this.jobSubject.asObservable();
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
  private setSessionStorageItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  private getSessionStorageItem(key: string): any {
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
