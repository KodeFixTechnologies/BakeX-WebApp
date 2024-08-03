import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import { DataService } from '../../../../services/data.service';
import { ProfileService } from '../../../../services/profile.service';
import { QueryService } from '../../../../services/query.service';
import { Employment } from '../../../../models/experience';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Users } from '../../../../models/user';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'employement-type',
  standalone: true,
  imports: [ListboxModule,CommonModule,FormsModule,ButtonModule],
  templateUrl: './employement-type.component.html',
  styleUrl: './employement-type.component.scss'
})
export class EmployementTypeComponent implements OnInit {
  
 updatedEmployment!:Employment[]
 employment!:Employment[];
 selectedEmployment!:Employment[];
 user:Users= {} as Users;
  constructor(
    private queryService:QueryService,
    private profileService: ProfileService,
    private  router:Router,
    private dataService:DataService
  )
  {

  }

  ngOnInit(): void {
    this.dataService.requestExpand('employment');
    this.dataService.getUserData().subscribe((data)=>{
      this.user=data;

    })

   

    this.queryService.getEmploymentTypes().subscribe((data)=>{

      this.employment=data;
      
    })




  this.updatedEmployment =this.profileService.getProfileInformation().employmentInformation;
  console.log(this.updatedEmployment)
  if(this.updatedEmployment && this.updatedEmployment.length>0)
  {
    this.selectedEmployment=this.profileService.getProfileInformation().employmentInformation;
  }

  }

  updateEmployment(event:any)
  {
  this.updatedEmployment=event.value;


   this.profileService.setProfileInformation({
     ...this.profileService.getProfileInformation(),
     employmentInformation: this.updatedEmployment
   });
  }

 
 
  nextPage() {

  
    if(this.updatedEmployment!=null)
      {
          this.router.navigate(['profile/experience'])
      }
    
  }
}
