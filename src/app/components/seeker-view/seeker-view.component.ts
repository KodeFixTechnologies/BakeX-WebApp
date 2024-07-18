import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DataService } from '../../services/data.service';
import { JobSeeker } from '../../models/jobSeeker';
import { QueryService } from '../../services/query.service';
import { Business, RecommendedJob } from '../../models/recommendedJobs';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { JobApplication } from '../../models/jobApplcation';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SeekerJobCardComponent } from "../shared/seeker-job-card/seeker-job-card.component";
import { Router } from '@angular/router';
import { SeekerJobComponent } from './seeker-jobs/seeker-job/seeker-job.component';

@Component({
    selector: 'seeker-view',
    standalone: true,
    templateUrl: './seeker-view.component.html',
    styleUrl: './seeker-view.component.scss',
    imports: [CardModule, CarouselModule, ButtonModule, DialogModule, CommonModule, SeekerJobCardComponent,SeekerJobComponent]
})
export class SeekerViewComponent implements OnInit {


  public timeLeft$: Observable<{
    secondsToDday: number;
    minutesToDday: number;
    hoursToDday: number;
    daysToDday: number;
  }>;

  constructor(
    private dataService: DataService,
    private queryService: QueryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.timeLeft$ = interval(1000).pipe(
      map((x) => this.calcDateDiff()),
      shareReplay(1)
    );
  }

  application: JobApplication = {} as JobApplication;
  jobSeeker: JobSeeker = {} as JobSeeker;
  recommendedJobs: RecommendedJob[] = [];
  mobileno: string = '';
  selectedJob: RecommendedJob = {} as RecommendedJob;
  business:Business[] = []
  businesses: { [key: number]: Business } = {};
  allJobs : RecommendedJob[] = []
  switchJobs : RecommendedJob[] = []
  activated : string = 'recommended'
  appliedJobs : RecommendedJob[] =[]


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

  calcDateDiff(endDay: Date = new Date(2024, 5, 27)): any {
    const dDay = endDay.valueOf();

    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;

    const timeDifference = dDay - Date.now();

    const daysToDday = Math.floor(
      timeDifference /
        (milliSecondsInASecond *
          minutesInAnHour *
          secondsInAMinute *
          hoursInADay)
    );

    const hoursToDday = Math.floor(
      (timeDifference /
        (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
        hoursInADay
    );

    const minutesToDday = Math.floor(
      (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
        secondsInAMinute
    );

    const secondsToDday =
      Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;

    return { secondsToDday, minutesToDday, hoursToDday, daysToDday };
  }

  displayDialog: boolean = false;
  ngOnInit(): void {
    this.dataService.setData(true);

    this.dataService.setDataforheader(true);

    this.getPhoneDataorTokenData()
    this.getJobSeekerDeatils();
    this.getBusinnessDetails();

   

  }

  goToJobComponent()
  {
    this.router.navigate(['allJobs']);
   
  }

  getBusinnessDetails()
  {
    this.queryService.getDistinctBusinessDetails().subscribe((data:Business[])=>{
        this.business=data;
        this.business.forEach(business=>{
          if(business.profileImageBase64)
            {
              business.profileImageBase64 = `data:image/png;base64,${business.profileImageBase64}`;
            }
        })
        this.business.forEach(business => {
          this.businesses[business.postedById] = business;
        });
      
        this.authService.setBusinessData(this.businesses)
      //  this.dataService.setBusinessData(this.businesses); // dont change it
       
    })
  }

  getPhoneDataorTokenData()
  {
    this.dataService.getPhoneData().subscribe((data) => {
      if (data) {
        this.mobileno = data;
      } else {
        this.mobileno = this.authService.getPhoneNo() || '';
      }
    });
  }

  getJobSeekerDeatils()
  {
    this.queryService.getJobSeekerDetails(this.mobileno).subscribe((data) => {
      this.jobSeeker = data;
     // this.dataService.setProfileData(this.jobSeeker) remove later

     this.authService.setUserProfileData(this.jobSeeker);
     
      this.authService.setProfileId(this.jobSeeker.profileId)
      if (this.jobSeeker.profileId != null) {
        this.queryService
          .getRecommendedJobs(this.jobSeeker.profileId)
          .subscribe((recommendedJob: RecommendedJob[]) => {
            this.recommendedJobs = recommendedJob;
            this.switchJobs=recommendedJob
          
          });

          this.queryService.getJobForSeeker(this.jobSeeker.profileId).subscribe(data => {
            this.allJobs = data;
            console.log(this.allJobs)
        
          });

          this.queryService.getAppliedJobForSeeker(this.jobSeeker.profileId).subscribe(data => {
            this.appliedJobs=data;
            
        });
          
      }
    });

   
  }

  viewJob(item: RecommendedJob) {
    this.selectedJob = item;
    this.displayDialog = true;

  
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

    });
  }

  changeJobType(id : number) {
    this.switchJobs = []
    if(id ===1) 
    {
      this.switchJobs = this.recommendedJobs
      this.activated = 'recommended'
    }
    else if (id ===2)
    {
      this.switchJobs = this.allJobs
      this.activated = 'allJobs'
    }
    else if(id ==3)
    {
        this.switchJobs = this.appliedJobs
      this.activated = 'Applied'
    }
  }

  goToProfile() {
    this.router.navigate(['/user-profile'])
  }

}