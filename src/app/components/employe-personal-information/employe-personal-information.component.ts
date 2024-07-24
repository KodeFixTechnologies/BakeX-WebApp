import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobSeeker } from '../../models/jobSeeker';

@Component({
  selector: 'employe-personal-information',
  standalone: true,
  imports: [],
  templateUrl: './employe-personal-information.component.html',
  styleUrl: './employe-personal-information.component.scss',
})
export class EmployePersonalInformationComponent implements OnInit {
  userAge: number = 0;

  userProfileData: JobSeeker = {} as JobSeeker;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userProfileData = this.authService.getUserProfileData();
    console.log(this.userProfileData);
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
