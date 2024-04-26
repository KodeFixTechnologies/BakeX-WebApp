import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { QueryService } from '../../services/query.service';
import { DialogModule } from 'primeng/dialog';
import { Observable, Subscription } from 'rxjs';
import { BakeMember } from '../../models/bakeMember';
import { FormsModule } from '@angular/forms';
import { Job } from '../../models/job';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { OwnerNavbarComponent } from '../owner-navbar/owner-navbar.component';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'owner-view',
  standalone: true,
  imports: [DialogModule,FormsModule,CommonModule,CardModule,ButtonModule,OwnerNavbarComponent,FileUploadModule],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss'
})
export class OwnerViewComponent implements OnInit, OnDestroy{

  bakeMember:BakeMember={} as BakeMember
  visible:boolean=false;
  phoneno:string='';
  job:Job={} as Job
  jobTitle: string='';
  company: string='';
  location: string='';
  jobType: string='';
  salary: string='';
  jobDescription: string='';
  submittedJobs: Job[] = [];
  bookMarkJobs:Job[]=[];
  showDialogSubscription: Subscription | undefined;

  bakeryOwnerProfileInfoSubscription:Subscription;
  constructor(
    private dataService:DataService,
    private queryService:QueryService,
    private cdr:ChangeDetectorRef,
    private messageService:MessageService,
    private profileService:ProfileService
  )
  {
    this.bakeryOwnerProfileInfoSubscription = this.profileService.bakeryOwnerProfileInfo$.subscribe();
  }


  maxSize:number=10000;


  ngOnInit(): void {

   
 
    this.dataService.getPhoneData().subscribe((data)=>{
      this.phoneno='8921537948';
      console.log(data)
    })

    
   this.queryService.getBakeOwner({ phoneno: this.phoneno}).subscribe((data)=>{
       this.bakeMember=data;
       console.log(data)

   });


    this.showDialogSubscription = this.dataService.showDialog$.subscribe(() => {
      this.visible = true; // Show the dialog when the service notifies
    });
  }

  
  ngOnDestroy(): void {
    console.log(this.showDialogSubscription?.unsubscribe())
   
 
    console.log(this.bakeryOwnerProfileInfoSubscription?.unsubscribe());
  

   
  }

  
  uploadedFiles:any
  submitJob() {
    // Push the submitted job to the list of submitted jobs
    this.submittedJobs.push({
      jobTitle: this.job.jobTitle,
      company: this.bakeMember.businessName,
      location: this.job.location,
      jobType: this.job.jobType,
      salary: this.job.salary,
      jobDescription: this.job.jobDescription
    });

    console.log(this.submittedJobs)

    // Clear the form fields after submission
    this.job.jobTitle = '';
    this.job.location = '';
    this.job.jobType = '';
    this.job.salary = '';
    this.job.jobDescription = '';

    this.visible=false;
    this.cdr.detectChanges()
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    console.log(event)
}

myUploader(event: any) {
  console.log("onUpload() START");
  console.log(event);
  const file = event.files[0]; // Assuming only one file is uploaded
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result as string;
    // Now you can send this base64String to your .NET Web API
    this.sendToBackend(base64String);
  };
  reader.readAsDataURL(file);
}

sendToBackend(base64String: string) {
  
  console.log(base64String)
}

}



