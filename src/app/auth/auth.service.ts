import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null); // Store user state

  constructor(private auth: Auth, private router: Router) {
    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Update the user state
      if (user) {
        console.log("User is logged in:", user.email);
      } else {
        console.log("User is logged out.");
      }
    });
  }

  // Get current user as Observable
  getCurrentUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  // Handle login for both email/password and Google Sign-in
  loginWithCredentials(email: string, password: string) {
    if (!email || !password) {
      return Promise.reject('Please enter both email and password.');
    }

    return signInWithEmailAndPassword(this.auth, email.trim(), password.trim())
      .then((userCredential) => {
        console.log("Email login successful!", userCredential);
        return userCredential.user;
      })
      .catch(error => {
        console.error("Login error:", error);
        throw this.handleAuthError(error);
      });
  }

  // Google Sign-In
  googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log("Google login successful!", result);
        return result.user;
      })
      .catch(error => {
        console.error("Google Sign-in error:", error);
        throw this.handleAuthError(error);
      });
  }

  // Handle authentication error messages
  private handleAuthError(error: any): string {
    let errorMessage = "Authentication failed. Please try again.";
    switch (error.code) {
      case 'auth/invalid-credential':
        errorMessage = "Invalid email or password. Please check your credentials.";
        break;
      case 'auth/user-not-found':
        errorMessage = "No account found with this email.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Try again.";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }
    return errorMessage;
  }

  // Logout
  logout() {
    return signOut(this.auth).then(() => {
      console.log("User logged out.");
      this.router.navigate(['/auth/login']);
    });
  }
}
