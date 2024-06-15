import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfile, Users } from '../models/user';
import { BakeMember } from '../models/bakeMember';
import { IBakerOwnerProfileRequest } from '../models/request/BakeOwnerProfileRequest';
import { Jobpost } from '../models/job';

import { JobApplication } from '../models/jobApplcation';
import { Business, RecommendedJob } from '../models/recommendedJobs';

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

  getDistinctBusinessDetails(): Observable<Business[]> {
    return this.http.get<Business[]>(`${environment.API_URL}getDistinctBusinessDetails`);
  }

  getJobPostByOwner(Id:number):Observable<any>
  {
  
    return this.http.get<any>(`${environment.API_URL}getJobPostByOwner/${Id}`);
  }
 
  getApplicantstByOwner(Id:number):Observable<any>
  {
  
    return this.http.get<any>(`${environment.API_URL}getApplicantsByOwner/${Id}`);
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


getJobSeekerDetails(phoneno: any): Observable<any> {
  return this.http.get<any>(`${environment.API_URL}getJobSeekerProfile/${phoneno}`);
}

getRecommendedJobs(profileId: number): Observable<RecommendedJob[]> {
  return this.http.get<RecommendedJob[]>(`${environment.API_URL}getRecommendedJobs/${profileId}`);
}

applyForJob(application: JobApplication): Observable<any> {
  return this.http.post<any>(environment.API_URL+'ApplyJobs', application);
}

  
}
