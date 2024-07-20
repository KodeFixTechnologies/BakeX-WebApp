import { Component, OnInit } from '@angular/core';
import { Business, RecommendedJob } from '../../../../models/recommendedJobs';
import { CommonModule } from '@angular/common';
import { SeekerJobComponent } from '../../seeker-jobs/seeker-job/seeker-job.component';
import { SeekerJobCardComponent } from '../../../shared/seeker-job-card/seeker-job-card.component';
import { JobSeeker } from '../../../../models/jobSeeker';
import { QueryService } from '../../../../services/query.service';
import { AuthService } from '../../../../services/auth.service';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'applied-job',
  standalone: true,
  imports: [CommonModule,SeekerJobCardComponent],
  
  templateUrl: './applied-job.component.html',
  styleUrl: './applied-job.component.scss'
})
export class AppliedJobComponent implements OnInit {

  constructor(
    private queryService:QueryService,
    private authService:AuthService,
    private dataService:DataService
  )
  {

  }
  appliedJobs: RecommendedJob[] = [];
  businesses: { [key: number]: Business } = {};
  userProfile: JobSeeker = {} as JobSeeker;
  profileId:any;
  ngOnInit(): void {
    this.dataService.setDataforheader(true);
      this.profileId=this.authService.getProfileId();
    this.queryService.getAppliedJobForSeeker(this.profileId).subscribe(data => {
        this.appliedJobs=data;
    });

    this.loadBusinessData()
    this.loadUserProfileData()
  }


  loadUserProfileData()
  {
    this.userProfile=this.authService.getUserProfileData();
  }
  loadBusinessData()
  {
    this.businesses = this.authService.getBusinessData();
  
  }

  }



