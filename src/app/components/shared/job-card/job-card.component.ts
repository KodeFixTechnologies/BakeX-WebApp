import { Component, Input } from '@angular/core';
import { Jobpost } from '../../../models/job';
import { BakeMember } from '../../../models/bakeMember';
import { jobTypeMap, JobTypeMap } from '../../../models/job-type-mapping';
import { DialogModule } from 'primeng/dialog';
import { QueryService } from '../../../services/query.service';
import { JobSeeker } from '../../../models/jobSeeker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from "../personal-information-card/personal-information.component";
@Component({
  selector: 'job-card',
  standalone: true,
  imports: [DialogModule, FormsModule, CommonModule, PersonalInformationComponent],
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


  jobSeekerProfile:JobSeeker={} as JobSeeker;
  constructor(private queryService: QueryService) {}
  jobTypeMap: { [key: number]: string } = {
    1: 'Full Time',
    2: 'Contract',
    3: 'Temporary',
    4: 'Part Time',
    // Add more mappings as needed
  };


  viewProfile(jobSeeker:JobSeeker)
  {
    console.log(jobSeeker)
    this.jobSeekerProfile=jobSeeker;
    console.log(this.jobSeekerProfile)
    this.profileDialog=!this.profileDialog
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


