import { Subscription } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  idToken,
  signInWithPopup,
  User as FirebaseUser,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  idToken$ = idToken(this.auth);
  authState$ = authState(this.auth);
  idTokenSubscription: Subscription;

  constructor(private router: Router) {
    this.idTokenSubscription = this.idToken$.subscribe((idToken) => {
      if (idToken) {
        console.log('ID Token: ', idToken);
      } else {
        console.log('No ID Token');
      }
    });
  }

  get user(): FirebaseUser | null {
    return this.auth.currentUser;
  }

  get isFirebaseAuthenticated(): boolean {
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
    this.idTokenSubscription.unsubscribe();
  }
}
