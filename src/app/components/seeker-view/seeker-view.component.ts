import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'seeker-view',
  standalone: true,
  imports: [CardModule],
  templateUrl: './seeker-view.component.html',
  styleUrl: './seeker-view.component.scss'
})
export class SeekerViewComponent {

}
