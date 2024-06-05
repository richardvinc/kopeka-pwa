import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { catchError } from 'rxjs';

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Report } from '@app/shared/interfaces/report.interface';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';
import { ReportService } from '@app/shared/services/report/report.service';

import { ReportCardItemListComponenet } from './report-card-item-list/report-card-item-list.component';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  templateUrl: './explore-page.component.html',
  imports: [RouterLink, ReportCardItemListComponenet, InfiniteScrollDirective],
})
export class ExplorePageComponent {
  reports: Report[] = [];
  nextToken: string | null = null;
  isGettingData = false;
  isAllDataLoaded = false;

  constructor(
    private appConfigService: AppConfigService,
    private reportService: ReportService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.appConfigService.setPageTitle('Utama');
    this.getReportData();
  }

  goToDetail(reportId: string) {
    this.router.navigate(['/explore/detail', reportId]);
  }

  onScrolled() {
    console.log('scrolled to the bottom!');
    if (this.isGettingData) {
      return;
    }
    this.isGettingData = true;
    this.getReportData();
  }

  getReportData() {
    if (this.isAllDataLoaded) {
      return;
    }
    this.reportService
      .getLatestReports({ next_token: this.nextToken ?? undefined })
      .pipe(
        catchError((error) => {
          console.error(error);
          throw error;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.reports.length === 0 && !res.nextToken) {
            console.log('All data loaded');
            this.isAllDataLoaded = true;
            return;
          }
          this.reports = this.reports.concat(res.reports);
          this.nextToken = res.nextToken;
          this.isGettingData = false;
        },
        error: (error) => {
          console.error(error);
          this.notificationService.showNotification(
            'Gagal mengambil data dari server.',
            NotificationType.SNACKBAR_ERROR
          );
          this.isGettingData = false;
        },
      });
  }
}
