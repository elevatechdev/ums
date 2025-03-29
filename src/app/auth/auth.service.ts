import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null); // Store user state

  constructor( private auth: Auth, private router: Router) {


    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // Update the user state
    });
  }
  // Get current user as Observable
  getCurrentUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
  // Email & Password Sign-In
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Google Sign-In
  googleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  // Logout
  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/auth/login']));
  }



}
