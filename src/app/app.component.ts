import { Subscription } from 'rxjs';

import { Component, inject } from '@angular/core';
import {
    Auth, authState, GoogleAuthProvider, idToken, signInWithPopup, User, user
} from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'kopeka-pwa';
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  idToken$ = idToken(this.auth);
  idTokenSubscription: Subscription;
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor() {
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
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    await this.auth.signOut();
    // this.userSubscription.unsubscribe();
    // this.authStateSubscription.unsubscribe();
    // this.idTokenSubscription.unsubscribe();
  }
}
