import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatchListComponent } from './match-list/match-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MatchListComponent,
    UserDetailComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-9prkqivq.us.auth0.com',
      clientId: 'THxpSzDld5aeNgJXovot3N6NJr3zq14u'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
