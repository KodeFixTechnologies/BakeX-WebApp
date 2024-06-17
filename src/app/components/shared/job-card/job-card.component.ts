import { Component, Input } from '@angular/core';
import { Jobpost } from '../../../models/job';
import { BakeMember } from '../../../models/bakeMember';
import { jobTypeMap,JobTypeMap } from '../../../models/job-type-mapping'; 
import { DialogModule } from 'primeng/dialog';
import { QueryService } from '../../../services/query.service';
import { JobSeeker } from '../../../models/jobSeeker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'job-card',
  standalone: true,
  imports: [DialogModule,FormsModule,CommonModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent   {
  @Input() jobPost: Jobpost | undefined;
  @Input() displayImage: string | undefined;
  @Input() bakeMember: BakeMember | undefined;
  displayDialog:boolean=false;
  jobSeekers:JobSeeker[]=[]
  constructor(
    private queryService:QueryService
  )
  {}
  jobTypeMap: { [key: number]: string } = {
    1: 'Full Time',
    2: 'Contract',
    3: 'Temporary',
    4: 'Part Time'
    // Add more mappings as needed
  };

  log(data:any)
  {
    console.log(data)
  }

  getJobType(): string {
    if (this.jobPost && this.jobPost.jobTypeId !== undefined && this.jobTypeMap[this.jobPost.jobTypeId]) {
      return this.jobTypeMap[this.jobPost.jobTypeId];
    } else {
      return 'Unknown Job Type';
    }
  }


  seeApplicants(id:any)
  {
     
      this.queryService.getApplicantstByOwner(id).subscribe((data)=>{
        this.jobSeekers=data;
        console.log(data)
      })
     
      this.displayDialog=true;
  }
}
