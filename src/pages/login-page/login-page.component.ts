import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  template: `
    <div>Login Page</div>
    <div><a routerLink="/home">Go to home page</a></div>
  `,
  imports: [RouterLink],
})
export class LoginPageComponent {
  constructor() {}
}
