import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OnboardingComponent } from './components/onboarding/home.component';
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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EducationInfoComponent } from './components/profile/stepper/education-info/education-info.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { OwnerJobsComponent } from './components/owner-view/owner-jobs/owner-jobs.component';
import { OwnerJobApplicantsComponent } from './components/owner-job-applicants/owner-job-applicants.component';
import { SeekerJobComponent } from './components/seeker-view/seeker-jobs/seeker-job/seeker-job.component';
import { AppliedJobComponent } from './components/seeker-view/applied-job/applied-job/applied-job.component';
import { PricingComponent } from './components/shared/pricing/pricing.component';
import { EmployementTypeComponent } from './components/profile/stepper/employement-type/employement-type.component';
import { PersonalInformationComponent } from './components/shared/personal-information-card/personal-information.component';
import { LogoComponent } from './components/bakery-owner-profile/stepper/logo/logo.component';

import { authGuard } from './auth.guard';
import { HelpCenterComponent } from './components/help-center/help-center.component';
import { OwnerBookmarkComponent } from './components/owner-view/owner-bookmark/owner-bookmark.component';


export const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
      { path: 'personal', component: PersonalInfoComponent },
      { path: 'location', component: LocationInfoComponent },
      {
        path: 'expertise',
        component: ExpertiseInfoComponent,
      },
      {
        path: 'education',
        component: EducationInfoComponent,
      },
      {
        path: 'experience',
        component: ExperinceInfoComponent,
      },
      {
        path: 'resume',
        component: ResumeComponent,
      },
      {
        path: 'employment',
        component: EmployementTypeComponent,
      },
    ],
  },

  {
    path: 'bakeprofile',
    component: BakeryOwnerProfileComponent,
    children: [
      { path: '', redirectTo: 'owner', pathMatch: 'full' },
      { path: 'owner', component: OwnerInfoComponent },
      {
        path: 'ownerlocation-info',
        component: OwnerlocationInfoComponent,
      },
      {
        path: 'business-info',
        component: BusinessInfoComponent,
      },
      {
        path:'logo',
        component:LogoComponent
      }
    ],
  },

  {
    path: 'otp',
    component: OtpComponent,
  },

  {
    path: 'ownerview',
    canActivate: [authGuard],  
    component: OwnerViewComponent,
  },

  {
    path: 'owner-jobs',
    canActivate: [authGuard], 
    component: OwnerJobsComponent,
  },

  {
    path:'bookmark',
    component:OwnerBookmarkComponent
  },

  {
    path: 'owner-profile',
    canActivate: [authGuard], 
    component: OwnerProfileComponent,
  },

  {
    path: 'jobs-applicants',
    canActivate: [authGuard], 
    component: OwnerJobApplicantsComponent,
  },

  {
    path: 'seeker',
    canActivate: [authGuard],  
    component: SeekerViewComponent,
  },

  {
    path: 'allJobs',
    canActivate: [authGuard], 
    component: SeekerJobComponent,
  },
  {
    path: 'applied-job',
    canActivate: [authGuard], 
    component: AppliedJobComponent,
  },

  {
    path: 'user-profile',
    canActivate: [authGuard],  
    component: UserProfileComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  { path: 'pricing', component: PricingComponent },
  {
    path: 'employee-personalDetails',
    component: PersonalInformationComponent,
  },
  {
    path: 'help-center',
    component:HelpCenterComponent
  }
];
