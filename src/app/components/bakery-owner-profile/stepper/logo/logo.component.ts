import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ProfileService } from '../../../../services/profile.service';
import { IBakerOwnerProfile, IBakerOwnerProfileRequest } from '../../../../models/request/BakeOwnerProfileRequest';
import { QueryService } from '../../../../services/query.service';
import { Users } from '../../../../models/user';
import { DataService } from '../../../../services/data.service';

import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logo',
  standalone: true,
  imports: [FileUploadModule,CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent implements OnInit {
  INonBakeMember: IBakerOwnerProfile = {} as IBakerOwnerProfile;
  constructor(
    private profileService:ProfileService,
    private queryService:QueryService,
    private dataService:DataService,
    private router:Router,
    private authService:AuthService
  )
  {

  }
  ngOnInit(): void {
 
    this.dataService.getUserData().subscribe((data) => {
      this.user = data;


    })
  }
  user: Users = {} as Users;
  NonBakeMember: IBakerOwnerProfileRequest = {} as IBakerOwnerProfileRequest;
  uploadedFiles:any
  imagePreview: string | ArrayBuffer | null = null;
  myUploader(event: any) {

    const file = event.files[0]; // Assuming only one file is uploaded
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // Now you can send this base64String to your .NET Web API
     this.sendToBackend(base64String);
    };
    reader.readAsDataURL(file);
  }


  sendToBackend(base64String: string|null) {
    
    this.INonBakeMember = this.profileService.getBakeryOwnerProfileInfo();
    this.INonBakeMember.otherInformation.ProfileImage="https://bakejoli.blob.core.windows.net/bakecontainer/MANGO-BAKERS-Logo.png";
    this.NonBakeMember = this.profileService.setProfileforBackend(this.INonBakeMember);
 //   this.jobPost.ProfileImage=base64String;
  
  }
  
  SkipNsubmit()
  {

  }
  submit()
  {

    this.sendToBackend(null);
  
    this.queryService.createUser(this.user).subscribe((response => {
        
     

      this.dataService.setUserData(this.user)

      if (response == true) {


        this.queryService.createNonBakeryowner(this.NonBakeMember).subscribe((response) => {
          if (response == true) {

             this.authService.setPhoneNo(this.NonBakeMember.phoneno);
            
             this.authService.checkUserExist(this.user).subscribe((response) => {

              if (response.token) {
                this.authService.setToken(response.token);
                let userTypeId = this.authService.getUserTypeId() 
                this.user.mobileNumber = this.authService.getPhoneNo() || '';
               
          
                if(userTypeId==2)
                  this.router.navigate(['/ownerview']);
                this.dataService.setData(true);
                }
                  
              
            })


          }

        })


      }

    }));
  }

   
}



