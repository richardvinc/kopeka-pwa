import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  user: User | null = null;
  constructor(
    private appConfigService: AppConfigService,
    private authService: AuthService,
    private router: Router
  ) {
    this.appConfigService.setPageTitle('Profile');
    this.user = this.authService.user;
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
