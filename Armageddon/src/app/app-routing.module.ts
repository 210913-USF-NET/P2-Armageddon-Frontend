import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './pages/profile/profile.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { BoardComponent } from './components/Game/board/board.component';

const routes: Routes = [

  {
    path: 'profile/:name',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home/:name',
    component: LobbyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'board',
    component: BoardComponent,
  },
  {
   path: '',
   component: LandingComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
