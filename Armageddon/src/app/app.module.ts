import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatchListComponent } from './match-list/match-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { environment } from 'src/environments/environment';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MatchListComponent,
    UserDetailComponent,
    AuthComponent,
    LandingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
