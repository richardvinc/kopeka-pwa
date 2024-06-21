import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

import { WalkingTogetherSvgComponent } from './components/walking-together-svg.component';

@Component({
  selector: 'app-campaign-info-page',
  templateUrl: './campaign-info-page.component.html',
  standalone: true,
  imports: [WalkingTogetherSvgComponent],
})
export class CampaignInfoPageComponent {
  constructor(
    private appConfigService: AppConfigService,
    private router: Router
  ) {
    this.appConfigService.setPageTitle(`Seputar Tamasya Trotoar`);
  }

  goToCampaignPage(): void {
    this.router.navigate(['/campaign']);
  }
}
