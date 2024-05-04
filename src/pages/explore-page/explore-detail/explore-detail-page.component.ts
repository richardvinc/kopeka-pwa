import { Component } from '@angular/core';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-explore-detail-page',
  standalone: true,
  templateUrl: './explore-detail-page.component.html',
})
export class ExploreDetailPageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Report Detail');
  }
}
