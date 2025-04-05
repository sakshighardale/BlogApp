import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

class MockAuthService {
  login(user: any) {
    return of({ token: 'mock-token' });
  }
}

class MockRouter {
  navigate(path: string[]) {
    return path;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login on login', () => {
    const authService = TestBed.inject(AuthService);
    const loginSpy = spyOn(authService, 'login').and.callThrough();

    component.user.email = 'test@example.com';
    component.user.password = 'password';
    component.onLogin();

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should store token on successful login', () => {
    spyOn(localStorage, 'setItem');
    component.user = { email: 'user@example.com', password: 'pass123' };

    component.onLogin();

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
  });

  it('should handle login error', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(
      throwError(() => ({
        error: { msg: 'Invalid credentials' },
      }))
    );
    spyOn(window, 'alert');

    component.user = { email: 'wrong@example.com', password: 'wrong' };
    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });
});
