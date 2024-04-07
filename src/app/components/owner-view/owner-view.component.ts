import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'owner-view',
  standalone: true,
  imports: [],
  templateUrl: './owner-view.component.html',
  styleUrl: './owner-view.component.scss'
})
export class OwnerViewComponent implements OnInit {


  constructor(
    private dataService:DataService
  )
  {
    
  }
  ngOnInit(): void {
     this.dataService.setData(true)
  }

}
