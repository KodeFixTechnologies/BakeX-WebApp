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
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, PlatformLocation } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SeekerJobCardComponent } from "../shared/seeker-job-card/seeker-job-card.component";
import { Router } from '@angular/router';
import { SeekerJobComponent } from './seeker-jobs/seeker-job/seeker-job.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../models/user';
import { NgOptimizedImage } from '@angular/common'
import { ImageLoader } from '@angular/common';
import { AnalyticsService } from '../../services/analytics.service';



@Component({
    selector: 'seeker-view',
    standalone: true,
    templateUrl: './seeker-view.component.html',
    styleUrl: './seeker-view.component.scss',
    imports: [CardModule, NgOptimizedImage,
      
      CarouselModule, ButtonModule, DialogModule, AutoCompleteModule,CommonModule,FormsModule, SeekerJobCardComponent,SeekerJobComponent],
      providers:[
        {
          provide: IMAGE_LOADER,
          useValue: (config: ImageLoaderConfig) => {
            return `https://bakejoli.blob.core.windows.net/bakecontainer/${config.src}?`;
          },
        },
      ]
})


export class SeekerViewComponent implements OnInit {

  customLoader:any;
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
    private router: Router,
    private platFormLocation:PlatformLocation,
    private analyticsService:AnalyticsService

  )
  
  {


    history.pushState(null,'',location.href);
    this.platFormLocation.onPopState(()=>{
     history.pushState(null,'',location.href)
    })

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
  selectedBusiness: Business | null = null;
  selectedDistrict: Business | null = null;
  searchText: string = '';
  selectedSalary: number | null = null;
  selectedJobType: string = '';
  selectedJobTypes: string[] = [];
  filteredJobs: RecommendedJob[] = [];
  filteredTitles: string[] = [];
  filteredBusinesses: Business[] = [];
  filteredBusinessesDistrict: Business[] = [];
  selectedSalaryRange: string = '';
  customSalary: number = 0;

  userProfile:UserProfile= {} as UserProfile

  jobTypes: { [key: string]: boolean } = {
    'Full Time': false,
    'Part Time': false,
    'Contract': false,
  };
  

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
    window.history.replaceState({}, '', '/seeker');
    this.dataService.setDataforheader(true);
    this.analyticsService.trackEvent('Login Success', 'Seeker logged in successfully', 'SeekerActions');
    if(this.authService.getToken() || this.authService.getUserProfileData())
    {

      this.getPhoneDataorTokenData()
      this.getJobSeekerDeatils();
      this.getBusinnessDetails();

    }
    else 
    {
      this.authService.logout();
     
    }



 
  }

  goToJobComponent()
  {
    this.router.navigate(['allJobs']);
    this.analyticsService.trackEvent('Login Success', 'Seeker Clicked Job Page', 'SeekerActions');
  }

  getBusinnessDetails()
  {
    this.queryService.getDistinctBusinessDetails().subscribe((data:Business[])=>{
        this.business=data;
        this.business.forEach(business=>{
          if(business.profileImageBase64)
            {
              business.profileImageBase64 = business.profileImageBase64;
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



    if(this.mobileno===undefined)
      {
        

        this.authService.logout();
      }

  }

  getJobSeekerDeatils()
  {
    if(this.mobileno==='')
    {
      this.authService.logout();
    }
    this.queryService.getJobSeekerDetails(this.mobileno).subscribe((data) => {
      this.jobSeeker = data;

      if(data==null)
      {
        this.authService.logout();
      }

     // this.dataService.setProfileData(this.jobSeeker) remove later
     this.authService.setUserProfileData(this.jobSeeker);
     
      this.authService.setProfileId(this.jobSeeker.profileId)
      if (this.jobSeeker.profileId != null) {
        this.queryService
          .getRecommendedJobs(this.jobSeeker.profileId)
          .subscribe((recommendedJob: RecommendedJob[]) => {
            this.recommendedJobs = recommendedJob.map(item => ({
              ...item,
              jobDescriptionLines: item.jobDescription.split(/[\n]/).map(line => line.trim())
            }));
            ;
            this.switchJobs=this.recommendedJobs
            this.applyFilters();
          });

          this.queryService.getJobForSeeker(this.jobSeeker.profileId).subscribe((data:RecommendedJob[]) => {
            // data.forEach(item=>item.jobDescription.slice(','))
            this.allJobs = data.map(item => ({
              ...item,
              jobDescriptionLines: item.jobDescription.split(',')
            }));
            

        
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
      this.analyticsService.trackEvent('Login Success', 'Seeker Applied Job', 'SeekerActions');
      this.hideDialog();

    });
  }

  changeJobType(id : number) {
    this.switchJobs = [];
    
    if(id ===1) 
    {
      this.switchJobs = this.recommendedJobs
      this.activated = 'recommended'
      this.clearFilters();
    }
    else if (id ===2)
    {
      this.switchJobs = this.allJobs
      this.activated = 'allJobs'
      this.clearFilters();
    }
    else if(id ==3)
    {
        this.switchJobs = this.appliedJobs
      this.activated = 'Applied'
      this.clearFilters();
    }
  }

  goToProfile() {
    this.router.navigate(['/user-profile'])
  }

  //Filter

  applyFilters() {
    this.filteredJobs = this.switchJobs.filter(job => {
      let passFilter = true;

      // Filter by job title (searchText)
      if (this.searchText && !job.expertiseType.toLowerCase().includes(this.searchText.toLowerCase())) {
        passFilter = false;
      }

  
      // Filter by salary (using selectedSalary range)
      // if (this.selectedSalary !== null && job.salary !== null) {
      //   const jobSalary = parseFloat(job.salary.replace(',', '')); // Assuming salary format like "1,000"
      //   if (jobSalary > this.selectedSalary) {
      //     passFilter = false;
      //   }
      // }

      if (this.selectedSalaryRange) {
        const jobSalary = job.salary ? parseFloat(job.salary.replace(',', '')) : 0;

        if (this.selectedSalaryRange === 'under10000' && jobSalary >= 10000) {
            passFilter = false;
        } else if (this.selectedSalaryRange === '10000-15000' && (jobSalary < 10000 || jobSalary > 15000)) {
            passFilter = false;
        } else if (this.selectedSalaryRange === '15000-30000' && (jobSalary < 15000 || jobSalary > 30000)) {
            passFilter = false;
        } else if (this.selectedSalaryRange === 'custom' && jobSalary > this.customSalary) {
            passFilter = false;
        }
    }

      // Filter by business name (selectedBusiness)
      if (this.selectedBusiness) {
        if (this.selectedBusiness.postedById !== job.postedById) {
          passFilter = false;
        }
      }

      if (this.selectedDistrict) {
        if (this.selectedDistrict.districtName !== job.districtName) {
          passFilter = false;
        }
      }


     //  Filter by job type
      //  if (this.selectedJobType && job.jobType.toLowerCase() !== this.selectedJobType.toLowerCase()) {
      //    passFilter = false;
      //  }

      const selectedJobTypes = Object.keys(this.jobTypes).filter(jobType => this.jobTypes[jobType]);
      if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(job.jobType)) {
          passFilter = false;
      }
  
      return passFilter;
    });


 
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
        this.selectedJobTypes.push(value);
    } else {
        this.selectedJobTypes = this.selectedJobTypes.filter(type => type !== value);
    }
    this.applyFilters();
}

  clearFilters() {
    this.searchText = '';
    this.selectedSalaryRange ='';
    this.selectedBusiness = null;
    this.selectedDistrict=null
    this.selectedJobType = '';
    this.filteredBusinesses = Object.values(this.businesses);
    this.filteredBusinessesDistrict = Object.values(this.businesses);
    this.applyFilters(); // Optionally, apply filters after clearing

  }

  searchBusiness(event: any) {
    const query = event.query.toLowerCase();
    this.filteredBusinesses = Object.values(this.businesses).filter(business =>
      business.businessName.toLowerCase().includes(query)
    );
  }

  searchDistrict(event: any) {
    const query = event.query.toLowerCase();
    const uniqueDistricts = new Set<string>();
    const filteredBusinesses = Object.values(this.businesses).filter(business => {
        const districtName = business.districtName.toLowerCase();
        if (districtName.includes(query) && !uniqueDistricts.has(districtName)) {
            uniqueDistricts.add(districtName);
            return true;
        }
        return false;
    });

    this.filteredBusinessesDistrict = filteredBusinesses;


}

  searchJobs(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTitles = [...new Set(
      this.switchJobs
        .map(job => job.expertiseType)
        .filter(expertiseType => expertiseType.toLowerCase().includes(query))
    )];

  }

  applyFiltersAndCloseDialog() {
    this.applyFilters();
  // Close the dialog after applying filters
  }

}

