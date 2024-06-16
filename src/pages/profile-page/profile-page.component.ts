import { app } from 'src/app/changelog';
import { environment } from 'src/environments/environment';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/interfaces/user.interface';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  user: User | null = null;
  appName = environment.appName;
  appVersion = app.version;

  constructor(
    private appConfigService: AppConfigService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.appConfigService.setPageTitle('Profil');
    this.userService.getSelf().subscribe((user) => {
      this.user = user;
    });
  }

  async goToChangelogPage() {
    this.router.navigate(['/profile/changelog']);
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}
