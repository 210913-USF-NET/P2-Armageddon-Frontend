import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './pages/profile/profile.component';
import { BoardComponent } from './components/Game/board/board.component';

const routes: Routes = [

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
     path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
   path: '',
   component: LandingComponent
  },
  {
    path: 'profile/:name',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'board',
    component: BoardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
