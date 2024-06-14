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
import { CommonModule } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'seeker-view',
  standalone: true,
  imports: [CardModule, CarouselModule, ButtonModule, DialogModule,CommonModule ],
  templateUrl: './seeker-view.component.html',
  styleUrl: './seeker-view.component.scss',
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
    private authService: AuthService
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

    this.dataService.getUserData().subscribe((data) => {
      //  this.mobileno = data.mobileNumber;
      console.log(data);
    });

    this.dataService.getPhoneData().subscribe((data) => {
      if (data) {
        this.mobileno = data;
      } else {
        this.mobileno = this.authService.getPhoneNo() || '';
      }
    });

    console.log(this.mobileno);

    this.queryService.getJobSeekerDetails(this.mobileno).subscribe((data) => {
      this.jobSeeker = data;

      console.log(this.jobSeeker);

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