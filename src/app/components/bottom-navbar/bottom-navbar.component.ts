import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bottom-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent implements OnInit{
  isLogin: boolean = false;

  constructor(
  private cdr:ChangeDetectorRef,
  private dataService:DataService
  )
  {

  }

  ngOnInit(): void {
    
    this.dataService.getData().subscribe((data)=>{
      this.isLogin=data;
    })
    this.cdr.detectChanges();
  }





}
