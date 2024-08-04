import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Jobpost } from '../../../models/job';
import { BakeMember } from '../../../models/bakeMember';
import { jobTypeMap, JobTypeMap } from '../../../models/job-type-mapping';
import { DialogModule } from 'primeng/dialog';
import { QueryService } from '../../../services/query.service';
import { JobSeeker } from '../../../models/jobSeeker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from "../personal-information-card/personal-information.component";
import { BookMark } from '../../../models/bookmark';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'job-card',
  standalone: true,
  imports: [DialogModule, FormsModule, CommonModule, PersonalInformationComponent,ToastModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss',
})
export class JobCardComponent {
  @Input() jobPost: Jobpost | undefined;
  @Input() displayImage: string | undefined;
  @Input() bakeMember: BakeMember | undefined;
  displayDialog: boolean = false;
  profileDialog: boolean = false;
  jobSeekers: JobSeeker[] = [];
  bookmark:BookMark = {} as BookMark
  isBookmarked = false;
  bookmarkedJobSeekers: Set<number> = new Set();  
  jobSeekerProfile:JobSeeker={} as JobSeeker;
  constructor(private queryService: QueryService,
    private cdr:ChangeDetectorRef,
    private messageService:MessageService


  ) {}
  jobTypeMap: { [key: number]: string } = {
    1: 'Full Time',
    2: 'Contract',
    3: 'Temporary',
    4: 'Part Time',
    // Add more mappings as needed
  };

  viewProfile(jobSeeker:JobSeeker)
  {
  
    const action = {
      OwnerId: this.bakeMember?.memberId,
      ProfileId: jobSeeker.profileId,
      ActionType: 'Viewed Profile',
      JobId:this.jobPost?.id,
      ActionDate: new Date().toISOString()
    };
    this.jobSeekerProfile=jobSeeker;
    
    this.queryService.recordAction(action).subscribe((response:any)=>{
      if(response==true)
      {
            //ariyilla
      }
    })
    this.profileDialog=!this.profileDialog
  }

  callJobSeeker(jobSeeker:JobSeeker)
  {
    const action = {
      OwnerId: this.bakeMember?.memberId,
      ProfileId: jobSeeker.profileId,
      ActionType: 'Initiated Call',
      JobId:this.jobPost?.id,
      ActionDate: new Date().toISOString()
    };

    this.queryService.recordAction(action).subscribe((response:any)=>{
      if(response==true)
      {
            //ariyilla
      }
    })
  }
  
  toggleBookmark(profileId: number | undefined, ownerId: number | undefined) {
    if (!profileId || !ownerId) return;
  
    // Check the number of existing bookmarks (if you have this data available)
    const bookmarksCount = this.jobSeekers.filter(seeker => seeker.isBookmarked).length;

    if (bookmarksCount >= 10) {
        alert('You have reached the maximum number of bookmarks.');
        return;
    }
  
    const jobSeeker = this.jobSeekers.find(seeker => seeker.profileId === profileId);
    if (!jobSeeker) return;
  
    this.bookmark.ProfileId = profileId;
    this.bookmark.OwnerId = ownerId;
  
    this.queryService.addBookmark(this.bookmark).subscribe({
      next: (response) => {

        jobSeeker.isBookmarked = !jobSeeker.isBookmarked;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.show()
        console.error('Error while toggling bookmark', err);
      }
    });
}

  show() {
    this.messageService.add({ key:'tc', severity: 'error', summary: 'Error', detail: 'You have reached maximum limit of bookmark' });
}

  getJobType(): string {
    if (
      this.jobPost &&
      this.jobPost.jobTypeId !== undefined &&
      this.jobTypeMap[this.jobPost.jobTypeId]
    ) {
      return this.jobTypeMap[this.jobPost.jobTypeId];
    } else {
      return 'Unknown Job Type';
    }
  }

  seeApplicants(id: any) {
    this.queryService.getApplicantstByOwner(id).subscribe((data) => {
      this.jobSeekers = data;
      this.jobSeekers.forEach(seeker => {
        // Assume that queryService.isBookmarked returns a boolean value indicating if the profile is bookmarked
        this.queryService.isBookmarked(seeker.profileId, this.bakeMember?.memberId).subscribe(result => {
          seeker.isBookmarked = result;
        });
      });
    });

    this.displayDialog = true;
  }

  getPostedDate(date: Date | undefined) {
    var postedDay;
    var postedDate
    if (date != undefined) {
      postedDay = new Date(date);
    }

    const currenDate = new Date();
    const currentDay = currenDate.getDate();

    if (postedDay) {
       postedDate = currentDay - postedDay.getDate();
 
    }
    if (postedDate === 0) return 'Posted Today';
    else return 'Posted'+ postedDate + ' days ago';
    
  }
}


