import { Component, OnInit } from '@angular/core';
import { Stepper, StepperModule } from 'primeng/stepper';
import { AnimateModule } from 'primeng/animate';
import { DataService } from '../../services/data.service';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api'; 
import { PersonalInfoComponent } from './stepper/personal-info/personal-info.component';
import { PrimeIcons } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [PersonalInfoComponent,StepperModule,AnimateModule,ToastModule,StepsModule,RouterOutlet,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit{
 
  items: MenuItem[]=[];

  constructor(
    private dataService:DataService,
    messageService:MessageService,
   
  )
  {

  }
  ngOnInit(): void {

    this.dataService.setData(true);
    
    this.items=[
      {
  
        icon:'custom-icon',
        routerLink:'personal',
        
      },
      {
         label:'',
         routerLink:'location'
      },
      {
        label:' ',
        routerLink:'expertise'
     },
     {
      label:' ',
      routerLink:'education'
   },
     {
      label:'',
      routerLink:'experience'
   },
//    {
//     label:'',
//     routerLink:'resume'
//  },
   
    ]

 
    
  }

 
}
