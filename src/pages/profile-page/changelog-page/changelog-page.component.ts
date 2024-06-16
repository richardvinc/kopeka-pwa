import { app } from 'src/app/changelog';

import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-changelog-page',
  standalone: true,
  templateUrl: './changelog-page.component.html',
})
export class ChangelogPageComponent {
  appVersion = app.version;
  changelogMessage = app.changelog;

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Sejarah Pengembangan');
    this.appConfigService.setShowBackButton(true);
  }
}
