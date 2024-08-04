import { Component, Input, OnInit, Query, ViewChild } from '@angular/core';
import { JobSeeker } from '../../../models/jobSeeker';
import { Business, RecommendedJob } from '../../../models/recommendedJobs';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { JobApplication } from '../../../models/jobApplcation';
import { QueryService } from '../../../services/query.service';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'seeker-job-card',
  standalone: true,
  imports: [DialogModule,CommonModule,ButtonModule],
  templateUrl: './seeker-job-card.component.html',
  styleUrl: './seeker-job-card.component.scss'
})
export class SeekerJobCardComponent implements OnInit {
  @Input() jobSeeker:JobSeeker |undefined;
  @Input()  business:Business[] = []
  @Input()  businesses: { [key: number]: Business } = {}
  @Input()  recommendedJob: RecommendedJob=  {} as RecommendedJob
  displayDialog: boolean = false;
  application: JobApplication = {} as JobApplication;
  @ViewChild('dialog') dialog: any;
  constructor(private queryService:QueryService,private dataService:DataService)
  {
   this.dataService.setData(true)
  }
  ngOnInit(): void {

  }

  checkScreenSize() {
    if (window.innerWidth <= 768) { // Define your mobile width threshold
      this.displayDialog = true;

        this.dialog.maximize();
      
    }
  }
  applyJob() {
   
    this.application.applyDate = new Date();
    this.application.jobPostId = this.recommendedJob.id;
    this.application.profileId = this.jobSeeker?.profileId ;

    this.queryService.applyForJob(this.application).subscribe((response) => {
      if(response)
      {
        this.recommendedJob.appliedStatus=1;
      }
      this.hideDialog();
    
    });
  }

  getPostedDate (date : Date ) {

    const postedDay = new Date(date)
    const currenDate = new Date()
    const currentDay = currenDate.getDate()
    
    const postedDate = currentDay - postedDay.getDate()
    if(postedDate === 0)
        return "Today"
    else

      return postedDate+" days ago"
  }

  hideDialog() {
    this.displayDialog = false;
  }
  
  viewJob() {
    this.checkScreenSize();
    this.displayDialog = true;


  }
  getProfileImage(profileImageBase64: string | null): string {
    return profileImageBase64 ? profileImageBase64 : '../../../../../assets/images/BakejoliLogo2.png';
  }
}
