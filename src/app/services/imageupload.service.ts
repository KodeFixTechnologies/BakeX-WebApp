import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageuploadService {
  constructor(private http: HttpClient) {}

  
  uploadFile(uploadFile: File | null): Observable<any> {
    if (!uploadFile) {
      throw new Error('No file provided for upload');
    }

    const formData = new FormData();
    formData.append('file', uploadFile, uploadFile.name);

    return this.http.post(environment.API_URL+'UploadtoAzureBlob', formData);
  }
}
