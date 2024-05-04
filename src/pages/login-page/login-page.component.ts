import { Subscription } from 'rxjs';

import { Component, inject } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  idToken,
  signInWithPopup,
  user,
  User,
} from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  imports: [RouterLink],
})
export class LoginPageComponent {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription;
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    });
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        console.log(aUser);
      }
    );
    this.idTokenSubscription = this.idToken$.subscribe(
      (token: string | null) => {
        //handle idToken changes here. Note, that user will be null if there is no currently logged in user.
        console.log(token);
      }
    );
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
