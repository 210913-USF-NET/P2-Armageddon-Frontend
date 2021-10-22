import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './pages/profile/profile.component';
import { LandingComponent } from './landing/landing.component';
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
  }


  // use something like the one above  to a home component in here
  // {
  //   path: '',
  //   component: HomeComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
