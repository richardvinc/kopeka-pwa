import { environment } from 'src/environments/environment';

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [RouterLink],
})
export class HomePageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle(
      `${environment.appName} - ${environment.env}`
    );
  }
}
