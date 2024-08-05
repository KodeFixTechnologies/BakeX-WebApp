import { Component, OnInit } from '@angular/core';
import { Stepper, StepperContent, StepperModule } from 'primeng/stepper';
import { AnimateModule } from 'primeng/animate';

import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

import { PrimeIcons } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from '../../shared/stepper/stepper.component';



@Component({
  selector: 'bake-owner-profile',
  standalone: true,
  imports: [
    StepperModule,
    AnimateModule,
    ToastModule,
    StepsModule,
    RouterOutlet,
    RouterLink,
    StepperComponent
  ],
  templateUrl: './bakery-owner-profile.component.html',
  styleUrl: './bakery-owner-profile.component.scss',
})
export class BakeryOwnerProfileComponent implements OnInit {
  items: MenuItem[] = [];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Personal Info',
        routerLink: 'owner',
      },

      {
        label: 'Business Info',
        routerLink: 'business-info',
      },

      {
        label: 'Location Info',
        routerLink: 'ownerlocation-info',
      },

      {
      label:'Logo',
      routerLink:'logo'
      }

      
    ];
  }

  
}
