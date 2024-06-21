import 'moment-duration-format';

import moment from 'moment';
import { ReportMiniListComponent } from 'src/components/reports/report-mini-list/report-mini-list.component';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CampaignService } from '@app/libs/campaigns/campaign.service';
import { Campaign } from '@app/libs/campaigns/interfaces/campaign.interface';
import { Report } from '@app/libs/reports/interfaces/report.interface';
import { ReportService } from '@app/libs/reports/report.service';
import { UserService } from '@app/libs/users/user.service';
import { CategoryHashtagPipe } from '@app/shared/pipes/category-hashtag.pipe';
import { FromNowPipe } from '@app/shared/pipes/date-from-now.pipe';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';

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
    ReportMiniListComponent,
  ],
})
export class CampaignPageComponent {
  userId: string | null = null;
  isLoading = true;
  isCampaigning = false;
  campaignCode = '';
  campaign: Campaign | null = null;
  campaignRunningTime: string | null = null;
  campaignToEndTime: string | null = null;
  campaignReports: Report[] = [];
  isCampaignExpired = false;

  constructor(
    private appConfigService: AppConfigService,
    private userService: UserService,
    private reportService: ReportService,
    private campaignService: CampaignService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.appConfigService.setPageTitle(`Tamasya Trotoar`);
    this.getUserActiveCampaign();
  }

  createCampaign(): void {
    this.isLoading = true;
    this.campaignService.createCampaign({}).subscribe((campaign) => {
      this.getUserActiveCampaign();
    });
  }

  joinCampaign(): void {
    if (this.campaignCode.length !== 6) return;
    this.isLoading = true;
    this.campaignService.joinCampaign(this.campaignCode).subscribe(() => {
      this.getUserActiveCampaign();
    });
  }

  leaveCampaign(): void {
    const answer = confirm('Apakah Anda yakin ingin keluar dari kampanye ini?');
    if (!answer) return;

    if (!this.campaign?.shortcode) return;
    this.campaignService
      .leaveCampaign(this.campaign.shortcode)
      .subscribe(() => {
        this.getUserActiveCampaign();
      });
  }

  copyCampaignCode(): void {
    if (!this.campaign?.shortcode) return;
    navigator.clipboard.writeText(this.campaign.shortcode || '');
    this.notificationService.showNotification(
      `Kode kampanye ${this.campaign?.shortcode} berhasil disalin`,
      NotificationType.SNACKBAR_SUCCESS
    );
  }

  private getUserActiveCampaign() {
    this.userService.getSelf().subscribe({
      next: (user) => {
        if (user?.active_campaign_id) {
          this.userId = user.id;
          this.campaignService
            .getCampaignById(user.active_campaign_id)
            .subscribe((campaign) => {
              if (campaign) {
                this.isCampaigning = true;
                this.campaign = campaign;
                this.campaignRunningTime =
                  this.convertDateToHumanReadableDuration(
                    new Date(campaign.created_at)
                  );
                this.campaignToEndTime =
                  this.convertDateToHumanReadableDuration(
                    new Date(campaign.expired_at)
                  );
                this.isLoading = false;
                this.isCampaignExpired = moment().isAfter(campaign.expired_at);
                this.reportService
                  .getReportsByCampaignId(campaign.id)
                  .subscribe((reports) => {
                    this.campaignReports = reports;
                  });
              } else {
                this.isCampaigning = false;
                this.campaign = null;
              }
            });
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.showNotification(
          'Gagal memuat data kampanye',
          NotificationType.SNACKBAR_ERROR
        );
        console.log(err);
      },
    });
  }

  goToReportDetail(reportId: string) {
    this.router.navigate(['explore/detail', reportId]);
  }

  goToCampaignInfo() {
    this.router.navigate(['campaign/onboarding']);
  }

  reactToreport(reportId: string) {
    const report = this.campaignReports.find(
      (report) => report.id === reportId
    );
    if (report) {
      report.is_reacted = !report.is_reacted;

      if (report.is_reacted) {
        this.reportService.likeReport(report.id).subscribe();
        report.total_reaction += 1;
      } else {
        this.reportService.unlikeReport(report.id).subscribe();
        report.total_reaction -= 1;
      }
    }
  }

  private convertDateToHumanReadableDuration(date: Date): string {
    const now = moment().utc().unix();
    const parsedDate = moment(date).utc().unix();
    // Calculate the duration between now and the date. convert to positive
    const duration = Math.abs(now - parsedDate);
    return moment.duration(duration, 'seconds').format('H [jam]: m [menit]');
  }
}
