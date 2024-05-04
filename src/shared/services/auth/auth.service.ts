import { Subscription } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  idToken,
  signInWithPopup,
  User,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription;
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        console.log('User logged in');
      } else {
        console.log('User not logged in');
      }
    });
    this.authStateSubscription = this.authState$.subscribe((authState) => {});
    this.idTokenSubscription = this.idToken$.subscribe((idToken) => {
      if (idToken) {
        console.log('ID Token: ', idToken);
      } else {
        console.log('No ID Token');
      }
    });
  }

  get user(): User | null {
    return this.auth.currentUser;
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  async login() {
    const user = await signInWithPopup(this.auth, new GoogleAuthProvider());
    if (user) {
      console.log('User logged in');
      this.router.navigate(['/explore']);
    } else {
      alert('Login failed');
    }
  }

  async logout() {
    console.log('Logging out');
    await this.auth.signOut();
    this.userSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
    this.idTokenSubscription.unsubscribe();
  }
}
