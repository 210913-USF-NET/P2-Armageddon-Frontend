import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginButtonComponent } from './components/authentication components/login-button/login-button.component';
import { SignupButtonComponent } from './components/authentication components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/authentication components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication components/authentication-button/authentication-button.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlayAsGuestComponent } from './components/authentication components/play-as-guest/play-as-guest.component';
import { TitleCardComponent } from './components/title-card/title-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    ProfileComponent,
    PlayAsGuestComponent,
    TitleCardComponent,
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
