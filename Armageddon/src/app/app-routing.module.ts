import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [

  {
    path: 'user/:id',
    component: UserDetailComponent
  },

  {
    path: 'user',
    component: UserListComponent
  },


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
