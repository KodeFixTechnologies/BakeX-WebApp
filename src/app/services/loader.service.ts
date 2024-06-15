// loader.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>();
  loaderState$ = this.loaderSubject.asObservable();
  private apiCallsCount = 0;
  private loaderTimeout: any;

  showLoader() {
    this.apiCallsCount++;
    if (!this.loaderTimeout) {
      this.loaderTimeout = setTimeout(() => {
        this.loaderSubject.next(true);
      }, 1000); // Delay of 2 second
    }
  }

  hideLoader() {
    if (this.apiCallsCount > 0) {
      this.apiCallsCount--;
    }
    if (this.apiCallsCount === 0) {
      clearTimeout(this.loaderTimeout);
      this.loaderTimeout = null;
      this.loaderSubject.next(false);
    }
  }
}
