import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { QueryService } from '../../services/query.service';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { BakeMember } from '../../models/bakeMember';
import { FormsModule } from '@angular/forms';
import { Job } from '../../models/job';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'owner-view',
  standalone: true,
  imports: [DialogModule,FormsModule,CommonModule,CardModule,ButtonModule],
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
  showDialogSubscription: any;
  constructor(
    private dataService:DataService,
    private queryService:QueryService,
    private cdr:ChangeDetectorRef
  )
  {
    
  }





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
    this.showDialogSubscription.unsubscribe();
  }


 
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


  saveBookMark(job:Job)
  {
    this.bookMarkJobs.push(job);
    console.log(this.bookMarkJobs)
  }
}



