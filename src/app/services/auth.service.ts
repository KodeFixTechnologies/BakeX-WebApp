import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { environment } from '../../environments/environment';
import { Users } from '../models/user';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class 
AuthService {

  constructor(
    private http: HttpClient
  ) {

  }

  googleUser: any

  private tokenKey = 'authToken';


  private businessesKey = 'businesses';
  private userProfileKey = 'userProfile';


  setUserProfileData(data: any) {
    sessionStorage.setItem(this.userProfileKey, JSON.stringify(data));
  }

  getUserProfileData(): any {
    const data = sessionStorage.getItem(this.userProfileKey);
    return data ? JSON.parse(data) : null;
  }


  setBusinessData(data: any) {
    sessionStorage.setItem(this.businessesKey, JSON.stringify(data));
  }

  getBusinessData(): any {
    const data = sessionStorage.getItem(this.businessesKey);
    return data ? JSON.parse(data) : null;
  }
  //this function will authenticate Using GoogleAuth Class From Capacitor Plugin
  async googleAuthentication() {
    await GoogleAuth.initialize();
  }

  //this function will signin with google and return the googleuser instance
  async signInWithGoogle() {
    this.googleUser = await GoogleAuth.signIn();
    return this.googleUser;
  }


  async signOut() {
    GoogleAuth.signOut();
  }


  
  checkUserExist(user:Users):Observable<any>
  {
    return this.http.post<any>(environment.API_URL+'CheckUserExist',user)
    
  }

  setProfileId(profileId:number)
  {
    sessionStorage.setItem('profileId', profileId.toString());
    console.log(profileId)
  }

   getProfileId(): number | null {
    const profileId = sessionStorage.getItem('profileId');
    return profileId ? parseInt(profileId, 10) : null;
  }
  


  setToken(token: string) {
    localStorage.setItem('authToken', token); // You can directly set the token here
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token !== null ? token : ''; // Return an empty string if token is null
  }
  

  logout() {
    localStorage.removeItem(this.tokenKey);
  }


  getUserTypeId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded)
      return decoded.UserTypeId || null;
    }
    return null;
  }

  getPhoneNo(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded)
      return decoded.PhoneNo || null;
    }
    return null;
  }


  
  getUserIdFromToken(): string | null {
    try {
      const decoded:any = this.getToken();
      return decoded?.nameid || null; // Assuming 'nameid' is the claim containing the user ID
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
  
  

}
