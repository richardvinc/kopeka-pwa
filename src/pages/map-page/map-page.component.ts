import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
})
export class MapPageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Map');
  }
}
