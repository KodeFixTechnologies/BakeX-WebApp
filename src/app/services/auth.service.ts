import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

  ) 
  { 

  }

  googleUser:any

  //this function will authenticate Using GoogleAuth Class From Capacitor Plugin
  async googleAuthentication()
  {
   await GoogleAuth.initialize();
  }
 
  //this function will signin with google and return the googleuser instance
  async signInWithGoogle()
  {
    this.googleUser= await GoogleAuth.signIn();
    return this.googleUser;
  }


  async signOut()
  {
    GoogleAuth.signOut();
  }

}
