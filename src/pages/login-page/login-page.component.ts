import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  imports: [RouterLink],
})
export class LoginPageComponent {
  constructor() {}
}
