import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Msg91Service {

private scriptLoadedSubject = new Subject<boolean>();

  constructor() {
    this.loadScript();
  }

  private loadScript() {
    const script = document.createElement('script');
    script.onload = () => this.scriptLoadedSubject.next(true);
    script.src = 'https://control.msg91.com/app/assets/otp-provider/otp-provider.js';
    document.body.appendChild(script);
  }

  sendOTP(configuration: any): Observable<any> {
    return new Observable(observer => {
      this.scriptLoadedSubject.subscribe(scriptLoaded => {
        if (scriptLoaded) {
          window as any['initSendOTP']
          ({
            ...configuration,
            success: (data: any) => {
              observer.next(data);
              observer.complete();
            },
            failure: (error: any) => observer.error(error)
          });
        } else {
          observer.error('Script failed to load');
        }
      });
    });
  }
}