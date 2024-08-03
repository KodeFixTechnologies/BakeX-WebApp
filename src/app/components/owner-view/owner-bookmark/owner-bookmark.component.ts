import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { OwnerNavbarComponent } from '../../owner-navbar/owner-navbar.component';

@Component({
  selector: 'owner-bookmark',
  standalone: true,
  imports: [OwnerNavbarComponent],
  templateUrl: './owner-bookmark.component.html',
  styleUrl: './owner-bookmark.component.scss'
})
export class OwnerBookmarkComponent  implements OnInit{

  constructor(
    private  dataService:DataService
  )
  {
    
    

  }
  ngOnInit(): void {
    this.dataService.setDataforheader(true)
  }

}
