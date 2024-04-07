import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit{
  constructor(private dataService :  DataService ){
  
  }
  ngOnInit(): void {
    this.dataService.setData(false);
  }
}
