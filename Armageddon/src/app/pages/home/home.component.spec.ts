import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ArmageddonApiService } from 'src/app/service/armageddon-api.service';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { ReplaySubject } from 'rxjs';
import { ActivatedRouteStub } from 'src/app/testing/activatedRouteStub';



describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();
    let service: ArmageddonApiService;
    let router: Router;
    let auth: AuthService;
    let test: HomeComponent;

    beforeEach(async () => {
        // test = new HomeComponent(route, service, auth, router);
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [
                RouterTestingModule, 
                HttpClientTestingModule,  
            ],

            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoute
                }
            ]
        })
            .compileComponents();
        service = TestBed.inject(ArmageddonApiService);
        router = TestBed.inject(Router);
    });

    beforeEach(() => {

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        
        activatedRoute.setParams({id:5})
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
