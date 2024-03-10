import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { IonButton, IonContent } from "@ionic/angular/standalone";
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'bakex-web';

 
  

}
