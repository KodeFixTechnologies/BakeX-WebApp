import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../models/user';

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



  setUserData(data:Users)
  {
    this.userSubject.next(data);
  }

  getUserData()
  {
    return this.userSubject.asObservable();
  }

  constructor() { }
}
