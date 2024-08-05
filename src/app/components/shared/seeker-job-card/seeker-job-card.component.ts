import { Component, Input, OnInit, Query, ViewChild } from '@angular/core';
import { JobSeeker } from '../../../models/jobSeeker';
import { Business, RecommendedJob } from '../../../models/recommendedJobs';
import { DialogModule } from 'primeng/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { JobApplication } from '../../../models/jobApplcation';
import { QueryService } from '../../../services/query.service';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../../services/data.service';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
interface EventItem {
  status?: string;
  date?: string | null;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'seeker-job-card',
  standalone: true,
  imports: [DialogModule,CommonModule,ButtonModule,FormsModule,TimelineModule
  ],
  templateUrl: './seeker-job-card.component.html',
  styleUrl: './seeker-job-card.component.scss',
  providers: [DatePipe]
})


export class SeekerJobCardComponent implements OnInit {
  @Input() jobSeeker:JobSeeker |undefined;
  @Input()  business:Business[] = []
  @Input()  businesses: { [key: number]: Business } = {}
  @Input()  recommendedJob: RecommendedJob=  {} as RecommendedJob
  displayDialog: boolean = false;
  application: JobApplication = {} as JobApplication;
  events: EventItem[]=[];
  @ViewChild('dialog') dialog: any;
  status:boolean=true;
  constructor(private queryService:QueryService,private dataService:DataService,private datePipe: DatePipe)
  {
   this.dataService.setData(true)
  }
  ngOnInit(): void {
    this.events = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];
  }


  checkScreenSize() {
    if (window.innerWidth <= 768) { // Define your mobile width threshold
      this.displayDialog = true;

        this.dialog.maximize();
      
    }
  }
  applyJob() {
   
    this.application.applyDate = new Date();
    this.application.jobPostId = this.recommendedJob.id;
    this.application.profileId = this.jobSeeker?.profileId ;

    this.queryService.applyForJob(this.application).subscribe((response) => {
      if(response)
      {
        this.recommendedJob.appliedStatus=1;
      }
      this.hideDialog();
    
    });
  }

  getPostedDate(date: Date): string {
    const postedDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());

    // Convert milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Return the formatted string
    if (diffDays === 0) {
        return "Today";
    } 
    else {
        return `${diffDays} days ago`;
    }
}

  hideDialog() {
    this.displayDialog = false;
  }
  

  
  viewJob() {
    this.checkScreenSize();
    this.displayDialog = true;
    var applyDate = this.datePipe.transform(this.recommendedJob.applyDate, 'yyyy-MM-dd');

 // Ensure recommendedJob and ownerActions are not null or undefined
 const ownerActions = (this.recommendedJob?.ownerActions ?? []).map((action: any) => ({
  status: action.actionType,
  date: this.datePipe.transform(action.actionDate, 'yyyy-MM-dd'),
  icon: this.getIconForActionType(action.actionType),
  color: this.getColorForActionType(action.actionType)
}));

    this.events = [
      { status: 'Applied', date: applyDate, icon: 'pi pi-shopping-cart', color: '#9C27B0' },
      { status: 'Profile Sent to Owner', date: applyDate, icon: 'pi pi-cog', color: '#673AB7' },
      ...ownerActions,
    
    ];


  }

  getIconForActionType(actionType: string): string {
    switch (actionType) {
      case 'Viewed Profile':
        return 'pi pi-eye'; // Example icon, adjust as needed
      case 'Initiated Call':
        return 'pi pi-phone'; // Example icon, adjust as needed
      default:
        return 'pi pi-info-circle'; // Default icon
    }
  }

  getColorForActionType(actionType: string): string {
    switch (actionType) {
      case 'Viewed Profile':
        return '#FF9800'; // Example color, adjust as needed
      case 'Initiated Call':
        return '#607D8B'; // Example color, adjust as needed
      default:
        return '#9E9E9E'; // Default color
    }
  }


  getProfileImage(profileImageBase64: string | null): string {
    return profileImageBase64 ? profileImageBase64 : '../../../../../assets/images/BakejoliLogo2.png';
  }
}
