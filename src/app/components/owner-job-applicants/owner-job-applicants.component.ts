import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { JobSeeker } from '../../models/jobSeeker';

@Component({
  selector: 'owner-job-applicants',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './owner-job-applicants.component.html',
  styleUrl: './owner-job-applicants.component.scss'
})
export class OwnerJobApplicantsComponent {
  @Input() jobSeeker: JobSeeker| undefined;
}
