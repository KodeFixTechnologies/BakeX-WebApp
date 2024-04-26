import { Injectable } from '@angular/core';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { environment } from '../../environments/environment';



const s3Client = new S3Client({
  endpoint: "https://kodefix.blr1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: true, // Configures to use subdomain/virtual calling format.
  region: "blr1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
  credentials: {
    accessKeyId: "DO00J7ANX763R8HRZ6XY", // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey:environment.SPACES_SECRET // Secret access key defined through an environment variable.
  }
  
});


const params = {
  
  Bucket: "BakeJoli", // The path to the directory you want to upload the object to, starting with your Space name.
  Key: "hello-world.txt", // Object key, referenced whenever you want to access this file later.
  Body: "Hello, World!", // The object's contents. This variable is an object, not a string.
 // Defines ACL permissions, such as private or public.

};


@Injectable({
  providedIn: 'root'
})


export class FileService {

  
 


  
  constructor(
   
  ) { 


    
  }


  async uploadObject()
  {
   
    try {
      var request = new PutObjectCommand(params);
 
      const data = await s3Client.send(new PutObjectCommand(params));

    }

    catch {

    }
  }
 


}



