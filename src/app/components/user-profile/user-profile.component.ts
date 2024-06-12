import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

   constructor(
    private dataService:DataService
   )
   {
 
   }
  ngOnInit(): void {

    this.dataService.setData(true)
    throw new Error('Method not implemented.');
  }



}
