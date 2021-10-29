// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService } from '@auth0/auth0-angular';
// import { ArmageddonApiService } from '../../service/armageddon-api.service';
// import { LandingComponent } from './landing.component';

// describe('LandingComponent', () => {
//   let component: LandingComponent;
//   let fixture: ComponentFixture<LandingComponent>;
//   let service: ArmageddonApiService;
//   let test: LandingComponent;
//   let route: ActivatedRoute;
//   let router: Router;
//   let auth: AuthService;

//   beforeEach(async () => {
//     test = new LandingComponent(route, service, router,auth);
//     await TestBed.configureTestingModule({
//       declarations: [LandingComponent],
//       imports: [RouterTestingModule, HttpClientModule],
//       providers: [ArmageddonApiService]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LandingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
