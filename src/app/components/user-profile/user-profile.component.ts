import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

   constructor(
    private dataService:DataService,
    private authService:AuthService,
    private router:Router
   )
   {
 
   }
  ngOnInit(): void {

    this.dataService.setData(true)
    throw new Error('Method not implemented.');
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate([""])
  }

}
