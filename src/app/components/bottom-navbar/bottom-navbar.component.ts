import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'bottom-navbar',
  standalone: true,
  imports: [CommonModule,DialogModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent implements OnInit{
  isLogin: boolean = false;
  visible=false;
  currentSelection  : String = 'home'


  constructor(
  private cdr:ChangeDetectorRef,
  private dataService:DataService,
  private router:Router
  )
  {

  }

  ngOnInit(): void {
    
   
    this.dataService.getData().subscribe((data)=>{
      this.isLogin=data;
    })
    this.cdr.detectChanges();
    this.currentSelection = localStorage.getItem('currentSelection') || 'home';

  }


   profilePageRediretion()
   {
     this.router.navigate(['/user-profile'])
     this.updateSelection("profile")
   }

   goToHome()
   {
    this.router.navigate(['/seeker'])
    this.updateSelection("home")
   }
   goToJobComponent()
   {
     this.router.navigate(['allJobs']);
     this.updateSelection('allJobs')
   }
   
   goToAppliedJob()
   {
     this.router.navigate(['applied-job']);
     this.updateSelection("appliedJobs")
   }

 
   showDialog() {
    this.dataService.openDialog();
}

updateSelection(selection: string) {
  this.currentSelection = selection;
  localStorage.setItem('currentSelection', selection);
}

}
