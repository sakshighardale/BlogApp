import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule], // ✅ Add FormsModule here
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.user).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      error: (err) => alert(err.error.msg || 'Login failed'),
    });
  }
}
