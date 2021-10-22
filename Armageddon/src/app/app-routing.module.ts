import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './pages/profile/profile.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [

  {
    path: 'user/:id',
    component: UserDetailComponent
  },

  {
    path: 'user',
    component: UserListComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: LandingPageComponent
  },
  {
     path: 'home/:name',
     component: HomeComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
   path: '',
    redirectTo: 'landing',
     pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
