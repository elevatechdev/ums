import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      window.alert("Please enter both email and password.");
      return;
    }

    const email = this.email.trim();
    const password = this.password.trim();

    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log("Login successful!");
        this.router.navigate(['/users']);
      })
      .catch(error => {
        console.error("Login error:", error);

        let errorMessage = "Login failed. Please try again.";

        if (error.code === 'auth/invalid-credential') {
          errorMessage = "Invalid email or password. Please check your credentials.";
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = "No account found with this email.";
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = "Incorrect password. Try again.";
        }

        window.alert(errorMessage);
      });
  }



  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(() => this.router.navigate(['/users']))
      .catch(error => console.error('Google Sign-in error:', error));
  }
}
