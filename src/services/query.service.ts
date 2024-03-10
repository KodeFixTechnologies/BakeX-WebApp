
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
     private http:HttpClient,
  ) { }


   getStates():Observable<any> 
    {
      return this.http.get<any>( environment.API_URL+'getStates')
    }
  
}
