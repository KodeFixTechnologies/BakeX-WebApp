import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<boolean>(false);

  private phoneData = new BehaviorSubject<string>('');

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
