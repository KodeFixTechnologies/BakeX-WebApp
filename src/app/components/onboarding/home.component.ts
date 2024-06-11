import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BottomNavbarComponent } from "../bottom-navbar/bottom-navbar.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule,RouterOutlet, BottomNavbarComponent]
})
export class OnboardingComponent implements OnInit {
    isLogin:any;
    constructor(private route: ActivatedRoute,
        private router:Router,
        private cdr: ChangeDetectorRef,
        private dataService:DataService
    ) { }

    ngOnInit(): void {
     

        this.dataService.setData(true);
     
        // Retrieve data from route parameters
        
      }

      selectedCategory(category:string)
      {
        if(category=="employee")
            {
                console.log("employee clicked")
                this.router.navigate(['\login']);
            }
        if(category=="owner")
            {  
                console.log("owner clicked")
                this.router.navigate(['/\login']);
            }    

      }
}
