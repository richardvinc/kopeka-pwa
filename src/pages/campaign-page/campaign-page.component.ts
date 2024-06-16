import 'moment-duration-format';

import moment from 'moment';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Campaign } from '@app/shared/interfaces/campaign.interface';
import { Report } from '@app/shared/interfaces/report.interface';
import { CategoryHashtagPipe } from '@app/shared/pipes/category-hashtag.pipe';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';
import { CampaignService } from '@app/shared/services/campaign/campaign.service';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import { ReportService } from '@app/shared/services/report/report.service';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-campaign-page',
  standalone: true,
  templateUrl: './campaign-page.component.html',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    FromNowPipe,
    CategoryHashtagPipe,
  ],
})
export class CampaignPageComponent {
  isCampaigning = false;
  campaignCode = '';
  campaign: Campaign | null = null;
  campaignRunningTime: string | null = null;
  campaignReports: Report[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private userService: UserService,
    private reportService: ReportService,
    private campaignService: CampaignService
  ) {
    this.appConfigService.setPageTitle(`Tamasya Trotoar`);
    this.getUserActiveCampaign();
  }

  createCampaign(): void {
    this.campaignService.createCampaign({}).subscribe((campaign) => {
      this.campaign = campaign;
      this.isCampaigning = true;
    });
  }

  joinCampaign(): void {
    if (this.campaignCode.length !== 6) return;
    this.campaignService.joinCampaign(this.campaignCode).subscribe(() => {
      this.getUserActiveCampaign();
    });
  }

  leaveCampaign(): void {
    if (this.campaignCode.length !== 6) return;
    this.campaignService.leaveCampaign(this.campaignCode).subscribe(() => {
      this.getUserActiveCampaign();
    });
  }

  private getUserActiveCampaign() {
    this.userService.getSelf().subscribe((user) => {
      if (user?.active_campaign_id) {
        this.campaignService
          .getCampaignById(user.active_campaign_id)
          .subscribe((campaign) => {
            if (campaign) {
              this.isCampaigning = true;
              this.campaign = campaign;
              this.campaignRunningTime =
                this.convertDateToHumanReadableDuration(campaign.created_at);
              this.reportService
                .getReportsByCampaignId(campaign.id)
                .subscribe((reports) => {
                  this.campaignReports = reports;
                });
            }
          });
      }
    });
  }

  goToReportDetail(reportId: string) {}
  reactToreport(reportId: string) {}

  private convertDateToHumanReadableDuration(date: Date): string {
    const now = moment().utc().unix();
    const parsedDate = moment(date).utc().unix();
    const duration = now - parsedDate;
    return moment.duration(duration, 'seconds').format('H [jam]: m [menit]');
  }
}
