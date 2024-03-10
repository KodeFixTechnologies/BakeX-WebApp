import { Component, OnInit } from '@angular/core';
import { QueryService } from '../../../services/query.service';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';



@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, ChipsModule, FormsModule,ButtonModule]
})
export class LoginComponent implements OnInit {

   user:any;
    constructor(
        private queryService: QueryService,
        private authService:AuthService
    ) {

    }



    ngOnInit() {
      this.authService.googleAuthentication();
    }

   async sigIn()
    {
   this.user=  await this.authService.signInWithGoogle();
   console.log(this.user)
    }

}
