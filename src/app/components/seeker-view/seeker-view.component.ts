import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DataService } from '../../services/data.service';
import { JobSeeker } from '../../models/jobSeeker';
import { QueryService } from '../../services/query.service';
import { RecommendedJob } from '../../models/recommendedJobs';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { JobApplication } from '../../models/jobApplcation';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'seeker-view',
  standalone: true,
  imports: [CardModule, CarouselModule, ButtonModule, DialogModule],
  templateUrl: './seeker-view.component.html',
  styleUrl: './seeker-view.component.scss',
})
export class SeekerViewComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private queryService: QueryService,
    private authService:AuthService
  ) {}
  application: JobApplication = {} as JobApplication;
  jobSeeker: JobSeeker = {} as JobSeeker;
  recommendedJobs: RecommendedJob[] = [];
  mobileno: string = '';
  selectedJob: RecommendedJob = {} as RecommendedJob;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];



  displayDialog: boolean = false;
  ngOnInit(): void {
    this.dataService.setData(true);

    this.dataService.getUserData().subscribe((data) => {
    //  this.mobileno = data.mobileNumber;
      console.log(data);
    });
  
    this.dataService.getPhoneData().subscribe((data)=>{

      if(data)
        {
          this.mobileno=data;
        }
      else 
      {
        this.mobileno=this.authService.getPhoneNo()||''
      }
    })


    console.log(this.mobileno)

    this.queryService.getJobSeekerDetails(this.mobileno).subscribe((data) => {
      this.jobSeeker = data;

      console.log(this.jobSeeker)

      if (this.jobSeeker.profileId != null) {
        this.queryService
          .getRecommendedJobs(this.jobSeeker.profileId)
          .subscribe((recommendedJob: RecommendedJob[]) => {
            this.recommendedJobs = recommendedJob;

            console.log(this.recommendedJobs);
          });
      }
    });
  }

  viewJob(item: RecommendedJob) {
    this.selectedJob = item;
    this.displayDialog = true;

    console.log(this.selectedJob);
  }

  hideDialog() {
    this.displayDialog = false;
  }

  applyJob() {
    this.application.applyDate = new Date();
    this.application.jobPostId = this.selectedJob.id;
    this.application.profileId = this.jobSeeker.profileId;

    this.queryService.applyForJob(this.application).subscribe((response) => {
      this.hideDialog();
      console.log(this.displayDialog);
    });
  }
}
