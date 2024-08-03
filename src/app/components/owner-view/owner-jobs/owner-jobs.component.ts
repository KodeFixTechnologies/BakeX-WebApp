import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Jobpost } from '../../../models/job';
import { BakeMember } from '../../../models/bakeMember';
import { JobCardComponent } from "../../shared/job-card/job-card.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OwnerNavbarComponent } from "../../owner-navbar/owner-navbar.component";
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'owner-jobs',
    standalone: true,
    templateUrl: './owner-jobs.component.html',
    styleUrl: './owner-jobs.component.scss',
    imports: [JobCardComponent, FormsModule, CommonModule, OwnerNavbarComponent,DialogModule]
})
export class OwnerJobsComponent implements OnInit {
   jobPost: Jobpost[] | undefined;
   displayImage: string | undefined;
   bakeMember: BakeMember | undefined;
   displayDialog:boolean=false

   jobTypeMap: { [key: number]: string } = {
    1: 'Full Time',
    2: 'Part Time',
    3: 'Contract',
    4: 'Temporary'
    // Add more mappings as needed
  };
  constructor(
    private dataService:DataService
  )
  {

  }
  ngOnInit(): void {

    this.dataService.getBakeryOwnerData().subscribe((data)=>{
      this.bakeMember=data;
    })

    this.dataService.getImage().subscribe((data)=>{
      this.displayImage=data;
    })

    this.dataService.getPostedJobData().subscribe((data)=>{

      this.jobPost=data;
      console.log(this.jobPost)
    })
   
  }


}
