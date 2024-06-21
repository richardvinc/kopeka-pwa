import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/libs/auth/auth.service';

import { WelcomeLoginSvgComponent } from './components/welcome-login-svg.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  imports: [RouterLink, WelcomeLoginSvgComponent],
})
export class LoginPageComponent {
  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    await this.authService.login();
    await this.router.navigate(['/explore']);
  }

  async logout() {
    await this.router.navigate(['/logout']);
  }
}
