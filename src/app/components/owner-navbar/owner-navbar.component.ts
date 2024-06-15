import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'owner-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './owner-navbar.component.html',
  styleUrl: './owner-navbar.component.scss'
})
export class OwnerNavbarComponent {

  isHidden: boolean = false;
  lastScrollTop: number = 0;
  delta: number = 5;
  navbarHeight: number = 56; // Adjust this value according to your actual navbar height

  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const st = window.scrollY || window.pageYOffset;
    if (Math.abs(this.lastScrollTop - st) <= this.delta)
      return;

    if (st > this.lastScrollTop && st > this.navbarHeight) {
      // Scroll Down
      this.isHidden = true;
    } else {
      // Scroll Up
      if (st + window.innerHeight < document.body.scrollHeight) {
        this.isHidden = false;
      }
    }

    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }

  constructor(
    private cdr:ChangeDetectorRef,
    private dataService:DataService,
    private router:Router
    )
    {
  
    }

  
  profilePageRediretion()
  {
    this.router.navigate(['/owner-profile'])
  }

  goToHome()
  {
   this.router.navigate(['/ownerview'])
  }

  showDialog() {
   this.dataService.openDialog();
}

goToJobPage()
{
  this.router.navigate(['/owner-jobs'])
}
}
