import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {  OnboardingComponent } from './components/onboarding/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalInfoComponent } from './components/profile/stepper/personal-info/personal-info.component';
import { LocationInfoComponent } from './components/profile/stepper/location-info/location-info.component';
import { ExpertiseInfoComponent } from './components/profile/stepper/expertise-info/expertise-info.component';
import { ExperinceInfoComponent } from './components/profile/stepper/experince-info/experince-info.component';
import { OtpComponent } from './components/otp/otp.component';
import { BakeryOwnerProfileComponent } from './components/bakery-owner-profile/bakery-owner-profile/bakery-owner-profile.component';
import { OwnerInfoComponent } from './components/bakery-owner-profile/stepper/owner-info/owner-info.component';
import { OwnerViewComponent } from './components/owner-view/owner-view.component';

import { ResumeComponent } from './components/profile/stepper/resume/resume.component';
import { OwnerProfileComponent } from './components/owner-view/owner-profile/owner-profile/owner-profile.component';
import { OwnerlocationInfoComponent } from './components/bakery-owner-profile/stepper/ownerlocation-info/ownerlocation-info.component';
import { BusinessInfoComponent } from './components/bakery-owner-profile/stepper/business-info/business-info.component';
import { SeekerViewComponent } from './components/seeker-view/seeker-view.component';
import { JobViewComponent } from './job-view/job-view.component';
import { EducationInfoComponent } from './components/profile/stepper/education-info/education-info.component';

export const routes: Routes = [
    {
        path: '', component: OnboardingComponent,

    },
    {
        path: 'login', component: LoginComponent,

    },

    {
        path: 'profile', component: ProfileComponent,
        children: [

            { path: '', redirectTo: 'personal', pathMatch: 'full' },
            { path: 'personal', component: PersonalInfoComponent },
            { path: 'location', component: LocationInfoComponent },
            {
                path: 'expertise', component: ExpertiseInfoComponent,
            },
            {
                path: 'education', component: EducationInfoComponent,
            },
            {
                path: 'experience', component:ExperinceInfoComponent,
            },
            {
                path: 'resume', component:ResumeComponent,
            }
        ],
    },

    {
        path: 'bakeprofile', component: BakeryOwnerProfileComponent,
        children: [

            { path: '', redirectTo: 'owner', pathMatch: 'full' },
            { path: 'owner', component: OwnerInfoComponent },
            {
                path:'ownerlocation-info',component:OwnerlocationInfoComponent
            },
            {
                path:'business-info', component:BusinessInfoComponent
            },
        
            
   
        ],
    },

    {
        path:'otp',component:OtpComponent
    },

    {
        path:'ownerview',component:OwnerViewComponent
    },
    
    {
        path:'owner-profile',component:OwnerProfileComponent
    },
 

    {
        path:'seeker',component:SeekerViewComponent
    },
    {
        path:'jobview', component:JobViewComponent
    }


 

];
