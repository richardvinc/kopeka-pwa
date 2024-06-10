import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-campaign-page',
  standalone: true,
  templateUrl: './campaign-page.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
})
export class CampaignPageComponent {
  isCampaigning = false;
  campaignCode = '';

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle(`Tamasya Trotoar`);
  }

  toogleIsCampaigning() {
    this.isCampaigning = !this.isCampaigning;
  }
}
