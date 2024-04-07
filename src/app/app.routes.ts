import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
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


export const routes: Routes = [
    {
        path: '', component: LoginComponent,

    },
    {
        path: 'home', component: HomeComponent,

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
                path: 'experience', component:ExperinceInfoComponent,
            }
        ],
    },

    {
        path: 'bakeprofile', component: BakeryOwnerProfileComponent,
        children: [

            { path: '', redirectTo: 'owner', pathMatch: 'full' },
            { path: 'owner', component: OwnerInfoComponent },
   
        ],
    },

    {
        path:'otp',component:OtpComponent
    },

    {
        path:'ownerview',component:OwnerViewComponent
    }

];
