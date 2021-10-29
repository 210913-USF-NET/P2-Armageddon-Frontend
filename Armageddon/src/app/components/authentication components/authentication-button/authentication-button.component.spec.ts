import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule, AuthService } from '@auth0/auth0-angular';


import { AuthenticationButtonComponent } from './authentication-button.component'

describe('AuthenticationButtonComponent', () => {
    let component: AuthenticationButtonComponent;
    let fixture: ComponentFixture<AuthenticationButtonComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthenticationButtonComponent],
            imports: [RouterTestingModule, HttpClientTestingModule,
                AuthModule.forRoot({
                    domain: 'YOURTENANTDOMAIN.DATACENTER.auth0.com',
                    clientId: '...',
                })
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
