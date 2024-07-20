import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../../services/query.service';
import { DataService } from '../../../../services/data.service';
import { JobSeeker } from '../../../../models/jobSeeker';
import { RecommendedJob, Business } from '../../../../models/recommendedJobs';
import { SeekerJobCardComponent } from '../../../shared/seeker-job-card/seeker-job-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Expertise } from '../../../../models/expertise';
import { Button, ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'seeker-job',
  standalone: true,
  imports: [SeekerJobCardComponent, FormsModule, CommonModule,AutoCompleteModule,ButtonModule,DialogModule],
  templateUrl: './seeker-job.component.html',
  styleUrl: './seeker-job.component.scss'
})
export class SeekerJobComponent implements OnInit {

  expertise!:Expertise[];
  display: boolean = false;
  userProfile: JobSeeker = {} as JobSeeker;
  allJobs: RecommendedJob[] = [];
  businesses: { [key: number]: Business } = {};
  filteredBusinesses: Business[] = [];
  filteredBusinessesDistrict: Business[] = [];
  selectedBusiness: Business | null = null;
  selectedDistrict: Business | null = null;
  searchText: string = '';
  selectedSalary: number | null = null;
  selectedJobType: string = '';
  filteredJobs: RecommendedJob[] = [];
  filteredTitles: string[] = [];
  profileId:any
  constructor(
    private queryService: QueryService,
    private dataService: DataService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.dataService.setData(true);
    const profileId = sessionStorage.getItem('profileId');
    this.profileId = this.authService.getProfileId();

    this.loadInitialData();
    this.loadUserProfileData()
    this.queryService.getExpertiseTypes().subscribe((data)=>{
   
      this.expertise=data;
    })
  }
  showFilter()
  {
    this.display = true;
  }
  loadInitialData() {
   


    this.loadBusinessData()

   
    this.queryService.getJobForSeeker(this.profileId).subscribe(data => {
      this.allJobs = data;
      this.filteredTitles = this.allJobs.map(job => job.experienceType);
      this.applyFilters();
  
    });
  }
 

  loadUserProfileData()
  {
    this.userProfile=this.authService.getUserProfileData();
  }
  loadBusinessData()
  {
    this.businesses = this.authService.getBusinessData();
     this.filteredBusinesses = Object.values(this.businesses);
     this.filteredBusinessesDistrict =Object.values(this.businesses);
  }
  applyFilters() {
    this.filteredJobs = this.allJobs.filter(job => {
      let passFilter = true;

      // Filter by job title (searchText)
      if (this.searchText && !job.expertiseType.toLowerCase().includes(this.searchText.toLowerCase())) {
        passFilter = false;
      }

  
      // Filter by salary (using selectedSalary range)
      if (this.selectedSalary !== null && job.salary !== null) {
        const jobSalary = parseFloat(job.salary.replace(',', '')); // Assuming salary format like "1,000"
        if (jobSalary > this.selectedSalary) {
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


      // Filter by job type
      if (this.selectedJobType && job.jobType.toLowerCase() !== this.selectedJobType.toLowerCase()) {
        passFilter = false;
      }
  
      return passFilter;
    });


 
  }

  clearFilters() {
    this.searchText = '';
    this.selectedSalary = null;
    this.selectedBusiness = null;
    this.selectedJobType = '';
    this.filteredBusinesses = Object.values(this.businesses);
    this.filteredBusinessesDistrict = Object.values(this.businesses);
    this.applyFilters(); // Optionally, apply filters after clearing
    this.display=false;
  }

  searchBusiness(event: any) {
    const query = event.query.toLowerCase();
    this.filteredBusinesses = Object.values(this.businesses).filter(business =>
      business.businessName.toLowerCase().includes(query)
    );
  }

  searchDistrict(event: any) {
    const query = event.query.toLowerCase();
    this.filteredBusinessesDistrict = Object.values(this.businesses).filter(business =>
      business.districtName.toLowerCase().includes(query)
    );
  }


  searchJobs(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTitles = [...new Set(
      this.allJobs
        .map(job => job.expertiseType)
        .filter(expertiseType => expertiseType.toLowerCase().includes(query))
    )];
  }

  applyFiltersAndCloseDialog() {
    this.applyFilters();
    this.display = false; // Close the dialog after applying filters
  }
  
}
