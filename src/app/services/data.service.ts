import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<boolean>(false);
 

  private createJobSubject = new BehaviorSubject<boolean>(false);

  private phoneData = new BehaviorSubject<string>('');

  private showDialogSource = new Subject<void>();

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

  
  
  setPhoneData(data: string) {
    this.phoneData.next(data);
  }

  getPhoneData() {
    return this.phoneData.asObservable();
  }

  constructor() { }
}
