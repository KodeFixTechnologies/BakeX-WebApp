import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { OwnerNavbarComponent } from '../../owner-navbar/owner-navbar.component';
import { QueryService } from '../../../services/query.service';
import { JobSeeker } from '../../../models/jobSeeker';
import { BakeMember } from '../../../models/bakeMember';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PersonalInfoComponent } from '../../profile/stepper/personal-info/personal-info.component';
import { PersonalInformationComponent } from '../../shared/personal-information-card/personal-information.component';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'owner-bookmark',
  standalone: true,
  imports: [OwnerNavbarComponent,CommonModule,DialogModule,PersonalInformationComponent],
  templateUrl: './owner-bookmark.component.html',
  styleUrl: './owner-bookmark.component.scss'
})
export class OwnerBookmarkComponent  implements OnInit{
  bookMarkedJobSeekers: JobSeeker[] = [];
  bakeMember: BakeMember | undefined;
  profileDialog:boolean=false;
  jobSeekerProfile:JobSeeker={} as JobSeeker;
  constructor(
    private  dataService:DataService,
    private queryService:QueryService,
    
  )
  {
    
    

  }
  ngOnInit(): void {
    this.dataService.setDataforheader(true);
    this.dataService.getBakeryOwnerData().subscribe((data)=>{
      this.bakeMember=data;
    })


    this.queryService.getBookmarkedJobSeekers(this.bakeMember?.memberId).subscribe({
      next: (data) => {
        this.bookMarkedJobSeekers = data;

      },
      error: (err) => {
        console.error('Error fetching bookmarked job seekers', err);
      }
    });
  }

  
  viewProfile(jobSeeker:JobSeeker)
  {
  
    this.jobSeekerProfile=jobSeeker;
    
    this.profileDialog=!this.profileDialog
  }
}
