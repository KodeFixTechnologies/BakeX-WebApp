import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { QueryService } from '../../../../services/query.service';
import { BakeMember } from '../../../../models/bakeMember';

@Component({
  selector: 'owner-profile',
  standalone: true,
  imports: [],
  templateUrl: './owner-profile.component.html',
  styleUrl: './owner-profile.component.scss'
})
export class OwnerProfileComponent implements OnInit {


  phoneno:string='';
  bakeMember:BakeMember = {} as BakeMember;
  constructor(
    private  dataService:DataService,
    private router:Router,
    private queryService:QueryService
  )
  {
 
  }
  ngOnInit(): void {
    this.dataService.getPhoneData().subscribe((data)=>{
      this.phoneno='8921537948';
      console.log(data)
    })

    
   this.queryService.getBakeOwner({ phoneno: this.phoneno}).subscribe((data)=>{
       this.bakeMember=data;
       console.log(data)
   })
  }

}
