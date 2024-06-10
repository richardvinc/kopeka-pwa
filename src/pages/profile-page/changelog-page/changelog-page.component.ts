import { app } from 'src/app/changelog';

import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-changelog-page',
  standalone: true,
  template: `
    <div
      class="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg mb-4 p-4"
    >
      <p class="mb-4">Versi Aplikasi: {{ appVersion }}</p>
      <h1 class="font-bold">Sejarah Pengembangan</h1>
      <p class="text-left">{{ changelogMessage }}</p>
    </div>
  `,
})
export class ChangelogPageComponent {
  appVersion = app.version;
  changelogMessage =
    app.changelog
      .find((change) => change.version === app.version)
      ?.changes.map((c) => `- ${c}`)
      .join('\n') || 'No changelog found';

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Sejarah Pengembangan');
    this.appConfigService.setShowBackButton(true);
  }
}
