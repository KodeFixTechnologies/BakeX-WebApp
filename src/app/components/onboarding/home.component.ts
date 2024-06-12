import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule,RouterOutlet, BottomNavbarComponent]
})
export class OnboardingComponent implements OnInit {
    isLogin:any;
    user:Users = { } as Users
    constructor(private route: ActivatedRoute,
        private router:Router,
        private cdr: ChangeDetectorRef,
        private dataService:DataService,
        private authService:AuthService,
      
    ) { }

    ngOnInit(): void {
      
        this.dataService.setData(false)
        
        let userTypeid = this.authService.getUserTypeId();
        let phoneNo = this.authService.getPhoneNo();

        if(userTypeid==1)
            {
              this.router.navigate(['\seeker'])
            }
        else if(userTypeid==2)
        {
            this.router.navigate(['/ownerview']);
        }    
        
     
        // Retrieve data from route parameters
        
      }

      selectedCategory(category:string)
      {
        if(category=="employee")
            { 
                this.user.userTypeId=1;
                this.dataService.setUserData(this.user)
                console.log("employee clicked")
                this.router.navigate(['\login']);
            }
        if(category=="owner")
            {   this.user.userTypeId=2;
                this.dataService.setUserData(this.user)
                console.log("owner clicked")
                this.router.navigate(['\login']);
            }    

      }
}
