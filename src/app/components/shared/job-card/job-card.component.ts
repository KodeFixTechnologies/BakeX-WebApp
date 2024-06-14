import { Component, Input } from '@angular/core';
import { Jobpost } from '../../../models/job';
import { BakeMember } from '../../../models/bakeMember';

@Component({
  selector: 'job-card',
  standalone: true,
  imports: [],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent {
  @Input() jobPost: Jobpost | undefined;
  @Input() displayImage: string | undefined;
  @Input() bakeMember: BakeMember | undefined;
}
