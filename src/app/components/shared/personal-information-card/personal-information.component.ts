import { Component, Input, OnInit } from '@angular/core';
import { JobSeeker } from '../../../models/jobSeeker';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BakeMember } from '../../../models/bakeMember';

@Component({
  selector: 'personal-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent implements OnInit {
  userAge: number = 0;
  @Input() userProfileData: JobSeeker = {} as JobSeeker;
  @Input() bakeMemberProfile:BakeMember={} as BakeMember;

  active: String = '';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    //  this.userProfileData = this.authService.getUserProfileData();
    if (this.userProfileData && Object.keys(this.userProfileData).length > 0) {
      this.active = 'jobSeeker';
    } else if (
      this.bakeMemberProfile &&
      Object.keys(this.bakeMemberProfile).length > 0
    ) {
      this.active = 'bakeMember';
    } else {
      this.active = 'unknown'; // Optional: handle case where both are empty
    }


  }

  formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  findAge(date: Date | string): number {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (typeof date === 'string') {
      date = new Date(date);
    }

    const birthYear = date.getFullYear();
    const birthMonth = date.getMonth();
    const birthDay = date.getDate();

    let age = currentYear - birthYear;

    // Adjust age if the current month and day are before the birth month and day
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    this.userAge = age;
    return this.userAge;
  }
}
