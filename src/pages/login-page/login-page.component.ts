import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  imports: [RouterLink],
})
export class LoginPageComponent {
  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    await this.authService.login();
    await this.router.navigate(['/explore']);
  }

  async logout() {
    await this.authService.logout();
  }
}
