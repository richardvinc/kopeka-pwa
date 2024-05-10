import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-campaign-page',
  standalone: true,
  templateUrl: './campaign-page.component.html',
  imports: [RouterLink],
})
export class CampaignPageComponent {
  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle(`Kampanye`);
  }
}
