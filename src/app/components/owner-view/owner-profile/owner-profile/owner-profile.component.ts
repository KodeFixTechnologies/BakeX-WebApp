import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { QueryService } from '../../../../services/query.service';
import { BakeMember } from '../../../../models/bakeMember';
import { OwnerNavbarComponent } from "../../../owner-navbar/owner-navbar.component";
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'owner-profile',
    standalone: true,
    templateUrl: './owner-profile.component.html',
    styleUrl: './owner-profile.component.scss',
    imports: [OwnerNavbarComponent]
})
export class OwnerProfileComponent implements OnInit {


  phoneno:string='';
  bakeMember:BakeMember = {} as BakeMember;
  constructor(
    private  dataService:DataService,
    private router:Router,
    private queryService:QueryService,
    private authService:AuthService
  )
  {
 
  }
  ngOnInit(): void {
    this.dataService.getPhoneData().subscribe((data)=>{

      if(data)
        {
          this.phoneno=data;
        }
        else {

          this.phoneno= this.authService.getPhoneNo() || ''
        }
 

    })

    
   this.queryService.getBakeOwner({ phoneno: this.phoneno}).subscribe((data)=>{
       this.bakeMember=data;
   
   })
  }


  logout()
  {
    this.authService.logout();
    this.router.navigate([""])
  }

}
