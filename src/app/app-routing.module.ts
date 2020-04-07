import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from './providers/services/active.guard';


const routes: Routes = [
  { path: '', redirectTo: 'landing-screen', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'landing-screen',
    loadChildren: () => import('./landing-screen/landing-screen.module').then( m => m.LandingScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'view-candidate',
    loadChildren: () => import('./view-candidate/view-candidate.module').then( m => m.ViewCandidatePageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'view-courses',
    loadChildren: () => import('./view-courses/view-courses.module').then( m => m.ViewCoursesPageModule)
  },
  {
    path: 'course-details',
    loadChildren: () => import('./course-details/course-details.module').then( m => m.CourseDetailsPageModule)
  },
  {
    path: 'view-jobs',
    loadChildren: () => import('./view-jobs/view-jobs.module').then( m => m.ViewJobsPageModule)
  },
  {
    path: 'job-details',
    loadChildren: () => import('./job-details/job-details.module').then( m => m.JobDetailsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'candidate-details/:cid',
    loadChildren: () => import('./candidate-details/candidate-details.module').then( m => m.CandidateDetailsPageModule)
  },
  {
    path: 'update-session-status/:candidateId',
    loadChildren: () => import('./update-session-status/update-session-status.module').then( m => m.UpdateSessionStatusPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
