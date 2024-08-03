import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { environment } from '../../environments/environment';
import { Users } from '../models/user';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class 
AuthService {

  constructor(
    private http: HttpClient,
    private router:Router,
    private dataService:DataService
  ) {

  }

  googleUser: any

  private tokenKey = 'authToken';


  private businessesKey = 'businesses';
  private userProfileKey = 'userProfile';

  private ownerPhone = 'phone'

  setPhoneNo(mobile:string)
  {
    sessionStorage.setItem(this.ownerPhone,mobile)
  }

  getUserMobile(): any {
    const data = sessionStorage.getItem(this.ownerPhone);
    return data ? JSON.parse(data) : null;
  }

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
    if (!token) {
      return null;
    }
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp; // Assuming 'exp' is the claim containing expiry time
    const now = Date.now() / 1000; // Convert to seconds
    if (now > exp) {
      localStorage.removeItem('authToken'); // Token expired, remove it
      return null;
    }
    return token;
  }

  logout() {
    this.dataService.setDataforheader(false);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('currentSelection')
    sessionStorage.removeItem(this.businessesKey);
    sessionStorage.removeItem(this.userProfileKey);
    this.router.navigate(['/'], { replaceUrl: true });
  }


  getUserTypeId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
   
      return decoded.UserTypeId || null;
    }
    return null;
  }

  getPhoneNo(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
    
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
