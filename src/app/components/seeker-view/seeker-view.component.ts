import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'seeker-view',
  standalone: true,
  imports: [CardModule],
  templateUrl: './seeker-view.component.html',
  styleUrl: './seeker-view.component.scss'
})
export class SeekerViewComponent implements OnInit {


  constructor(
    private dataService:DataService
  )
  {

  }
  ngOnInit(): void {
     this.dataService.setData(true);
  }

}
