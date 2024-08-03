import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { QueryService } from '../../../../services/query.service';
import { BakeMember } from '../../../../models/bakeMember';
import { OwnerNavbarComponent } from '../../../owner-navbar/owner-navbar.component';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from '../../../shared/personal-information-card/personal-information.component';
const shareData = {
  title: 'Bake Joli',
  text: 'Join Bake Joli',
  url: 'www.bakejoli.com',
};

@Component({
  selector: 'owner-profile',
  standalone: true,
  templateUrl: './owner-profile.component.html',
  styleUrl: './owner-profile.component.scss',
  imports: [OwnerNavbarComponent, CommonModule, PersonalInformationComponent],
})
export class OwnerProfileComponent implements OnInit {
  showLogout: Boolean = false;
  visible: Boolean = false;

  phoneno: string = '';
  bakeMember: BakeMember = {} as BakeMember;
 
  constructor(
    private dataService: DataService,
    private router: Router,
    private queryService: QueryService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.dataService.getPhoneData().subscribe((data) => {
      if (data) {
        this.phoneno = data;
      } else {
        this.phoneno = this.authService.getPhoneNo() || '';
      }
    });

    this.queryService
      .getBakeOwner({ phoneno: this.phoneno })
      .subscribe((data) => {
        this.bakeMember = data;
        console.log(data)
      
  
      });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  logoutPop() {
    this.showLogout = !this.showLogout;
  }

  gotoProfilePage() {
    this.visible = !this.visible;
  }

  navigatetoPolicy() {
    this.router.navigate(['/privacy-policy']);
  }

  goToHelpCenter()
  {
    this.router.navigate(['/help-center']);
  }
  share() {
    try {
      navigator.share(shareData);
    } catch {}
  }
}
