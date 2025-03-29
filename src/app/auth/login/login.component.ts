import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      window.alert("Please enter both email and password.");
      return;
    }

    this.loading = true;
    this.authService.loginWithCredentials(this.email, this.password)
      .then(() => {
        this.loading = false; 
        this.router.navigate(['/users']);
      })
      .catch(errorMessage => {
        this.loading = false;
        window.alert(errorMessage);
      });
  }

  // Method to handle Google login
  loginWithGoogle() {
    this.loading = true;
    this.authService.googleSignIn()
      .then(() => {
        this.loading = false;
      })
      .catch(errorMessage => {
        this.loading = false;
        window.alert(errorMessage);
      });
  }
}
