import { Component, Input, Query } from '@angular/core';
import { JobSeeker } from '../../../models/jobSeeker';
import { Business, RecommendedJob } from '../../../models/recommendedJobs';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { JobApplication } from '../../../models/jobApplcation';
import { QueryService } from '../../../services/query.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'seeker-job-card',
  standalone: true,
  imports: [DialogModule,CommonModule,ButtonModule],
  templateUrl: './seeker-job-card.component.html',
  styleUrl: './seeker-job-card.component.scss'
})
export class SeekerJobCardComponent {
  @Input() jobSeeker:JobSeeker |undefined;
  @Input()  business:Business[] = []
  @Input()  businesses: { [key: number]: Business } = {}
  @Input()  recommendedJob: RecommendedJob=  {} as RecommendedJob
  displayDialog: boolean = false;
  application: JobApplication = {} as JobApplication;

  constructor(private queryService:QueryService)
  {

  }
  // jobSeeker: JobSeeker = {} as JobSeeker;
  // recommendedJobs: RecommendedJob[] = [];
  // mobileno: string = '';
  // selectedJob: RecommendedJob =;
  // business:Business[] = []
  // businesses: { [key: number]: Business } = {};

  // viewJob(item: RecommendedJob) {
  //   this.selectedJob = item;
  //   this.displayDialog = true;

  //   console.log(this.selectedJob);
  // }

  applyJob() {
    console.log(this.jobSeeker?.profileId)
    this.application.applyDate = new Date();
    this.application.jobPostId = this.recommendedJob.id;
    this.application.profileId = this.jobSeeker?.profileId ;

    this.queryService.applyForJob(this.application).subscribe((response) => {
      this.hideDialog();
      console.log(this.displayDialog);
    });
  }

  hideDialog() {
    this.displayDialog = false;
  }
  
  viewJob() {

    this.displayDialog = true;


  }

}
