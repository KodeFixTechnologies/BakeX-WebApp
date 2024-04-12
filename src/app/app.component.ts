import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginComponent } from './components/login/login.component';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { QueryService } from './services/query.service';
import { Users } from './models/user';

import { BottomNavbarComponent } from "./components/bottom-navbar/bottom-navbar.component";
import { BrowserModule } from '@angular/platform-browser';

import { ProfileComponent } from './components/profile/profile.component';
import { BakeryOwnerProfileComponent } from './components/bakery-owner-profile/bakery-owner-profile/bakery-owner-profile.component';
import { OnboardingComponent } from './components/onboarding/home.component';
declare const google: any;
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [LoginComponent, OnboardingComponent,BottomNavbarComponent,ProfileComponent,BakeryOwnerProfileComponent, RouterOutlet, RouterLink]
})
export class AppComponent implements OnInit {
 googleUser:any;

  constructor(
    private render:Renderer2,
    private queryService:QueryService,
    private router:Router
  )
  {
  
  }
  ngOnInit(): void {
    initFlowbite();
   
  }

 


  title = 'BakeJoli-WebApp';


}
