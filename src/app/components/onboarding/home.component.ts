import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";
import { CommonModule, PlatformLocation } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule,RouterOutlet, BottomNavbarComponent,FormsModule]
})
export class OnboardingComponent implements OnInit {
    isLogin:any;
    user:Users = { } as Users
    pricingData: any;
    selectedPricing: string = 'Employee';
    isLoading = true; 
    constructor(private route: ActivatedRoute,
        private router:Router,
        private cdr: ChangeDetectorRef,
        private dataService:DataService,
        private authService:AuthService,
        private queryService:QueryService,
        private platFormLocation:PlatformLocation
    ) { 

            //prevent backward navigationcode
    history.pushState(null,'',location.href);
    this.platFormLocation.onPopState(()=>{
     history.pushState(null,'',location.href)
    })
    }

    ngOnInit(): void {
      
        this.queryService.getPricingData().subscribe(data => {
            this.pricingData = data;
            this.isLoading = false; 
       
          });


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
         
                this.router.navigate(['\login']);
            }
        if(category=="owner")
            {   this.user.userTypeId=2;
                this.dataService.setUserData(this.user)
               
                this.router.navigate(['\login']);
            }    

      }

      selectPricing(pricingOption: string): void {
        this.selectedPricing = pricingOption;
      }
}
