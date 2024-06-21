import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { catchError } from 'rxjs';

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Report } from '@app/libs/reports/interfaces/report.interface';
import { ReportService } from '@app/libs/reports/report.service';
import { User } from '@app/libs/users/interfaces/user.interface';
import { UserService } from '@app/libs/users/user.service';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';

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
  user: User | null = null;

  constructor(
    private appConfigService: AppConfigService,
    private reportService: ReportService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
    this.appConfigService.setPageTitle('Utama');
    this.getReportData();
    this.user = this.userService.getUser();
  }

  goToDetail(reportId: string) {
    this.router.navigate(['/explore/detail', reportId]);
  }

  reactToReport(param: { reportId: string; isReacted: boolean }) {
    if (param.isReacted) {
      this.reportService.likeReport(param.reportId).subscribe();
    } else {
      this.reportService.unlikeReport(param.reportId).subscribe();
    }
  }

  deleteReport(reportId: string) {
    console.log('Deleted report with id:', reportId);
    this.reportService.deleteReport(reportId).subscribe({
      next: () => {
        this.reports = this.reports.filter((report) => report.id !== reportId);
        this.notificationService.showNotification(
          'Laporan terhapus',
          NotificationType.SNACKBAR_SUCCESS
        );
        if (this.reports.length < 5) this.getReportData();
      },
      error: (error) => {
        console.error(error);
        this.notificationService.showNotification(
          'Gagal menghapus laporan.',
          NotificationType.SNACKBAR_ERROR
        );
      },
    });
  }

  onScrolled() {
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
