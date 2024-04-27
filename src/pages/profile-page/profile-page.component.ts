import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Profile');
  }
}
