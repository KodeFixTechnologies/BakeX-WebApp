import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfile, Users } from '../models/user';
import { BakeMember } from '../models/bakeMember';
import { IBakerOwnerProfileRequest } from '../models/request/BakeOwnerProfileRequest';
import { Jobpost } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }


  insertUser(user:Users):Observable<any> 
  {
    return this.http.post<any>( environment.API_URL+'InsertUser',user)
  }


  getStateAndDistrict():Observable<any> 
  {
    return this.http.get<any>( environment.API_URL+'getDistrict')
  }

  getEmploymentTypes():Observable<any> 
  {
    return this.http.get<any>( environment.API_URL+'getEmploymentCategory')
  }


  getExpertiseTypes():Observable<any> 
  {
    return this.http.get<any>( environment.API_URL+'getExpertiseCategory')
  }

  

  getLocationData():Observable<any>
  {
    return this.http.get('assets/location-info.json')
  }

  getExpertiseData():Observable<any>
  {
    return this.http.get('assets/expertise-info.json')
  }


  verifyBakeUser(phoneno: any): Observable<any> {
    // Modify the API call to use query parameters
    return this.http.post<any>(`${environment.API_URL}IsBakeUser?phoneno=${phoneno.phoneno}`, null);
  }

  getBakeOwner(phoneno:any):Observable<any>
  {
  
    return this.http.post<any>(`${environment.API_URL}getBakeOwner?phoneno=${phoneno.phoneno}`,null)
  }


  createNonBakeryowner(NonBakeOwner:IBakerOwnerProfileRequest):Observable<any>
  {
    return this.http.post<any>(environment.API_URL+'createBakeryOwner',NonBakeOwner);
  }

  createJobPost(jobpost:Jobpost):Observable<any>
  {
    return this.http.post<any>(environment.API_URL+'CreateJobPost',jobpost)
  }


  createUser(user:Users):Observable<any>
  {
    return this.http.post<any>(environment.API_URL+'InsertUser',user)
  }

insertProfile(userProfile:UserProfile):Observable<any>
{
  return this.http.post<any>(environment.API_URL+'InsertProfile',userProfile)
}

checkUserExist(user:Users):Observable<any>
{
  return this.http.post<any>(environment.API_URL+'CheckUserExist',user)
}
  
}
