import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";
import { CommonModule, PlatformLocation } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { QueryService } from '../../services/query.service';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
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
        private platFormLocation:PlatformLocation,
        private meta: Meta, private title: Title
    ) { 

            //prevent backward navigationcode
    history.pushState(null,'',location.href);
    this.platFormLocation.onPopState(()=>{
     history.pushState(null,'',location.href)
    })
    }

    ngOnInit(): void {

        this.title.setTitle('Bakejoli - Connecting jobseekers with Job Opportunities in the Food Industry');
        this.meta.addTags([
          { name: 'description', content: 'Bakejoli connects bakers with employment opportunities in the food industry. Find jobs, hire talent, and streamline your bakery business. Join over 5000 bakers today.' },
          { name: 'keywords', content: 'hotel jobs kerala, bakery employment, kerala jobs, bakejoli, food industry jobs,kerala food jobs,' },
          { name: 'author', content: 'Bakejoli' },
          { name: 'robots', content: 'index, follow' },
          { property: 'og:title', content: 'BakeJoli - Connecting job seekerks with Job Opportunities in the Food Industry' },
          { property: 'og:description', content: 'Bakejoli connects job seekerks with employment opportunities in the food industry. Find jobs, hire talent, and streamline your bakery business. Join over 5000 bakers today.' },
          { property: 'og:url', content: 'https://bakejoli.com' },
          { property: 'og:type', content: 'website' },

        ]);
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
