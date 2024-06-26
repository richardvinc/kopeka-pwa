import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CampaignService } from '@app/libs/campaigns/campaign.service';
import { Campaign } from '@app/libs/campaigns/interfaces/campaign.interface';
import { ImageFallbackDirective } from '@app/shared/directives/image-fallback.directive';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-past-campaigns-page',
  templateUrl: './past-campaigns-page.component.html',
  standalone: true,
  imports: [FromNowPipe, DatePipe, ImageFallbackDirective],
})
export class PastCampaignsPageComponent {
  campaigns: Campaign[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private campaignService: CampaignService
  ) {
    this.appConfigService.setPageTitle(`Tamasya Trotoar yang Diikuti`);
    this.appConfigService.setShowBackButton(true);

    this.campaignService.getPastCampaigns().subscribe((campaigns) => {
      this.campaigns = campaigns.map((campaign) => {
        return { ...campaign };
      });
    });
  }
}
