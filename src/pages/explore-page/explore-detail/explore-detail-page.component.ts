import { catchError, combineLatest, of, switchMap } from 'rxjs';
import { ReportInfoCardComponent } from 'src/components/reports/report-info-card/report-info-card.component';
import { ReportMiniListComponent } from 'src/components/reports/report-mini-list/report-mini-list.component';
import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-explore-detail-page',
  standalone: true,
  templateUrl: './explore-detail-page.component.html',
  imports: [
    CommonModule,
    GoogleMap,
    MapMarker,
    ReportMiniListComponent,
    FromNowPipe,
    CategoryHashtagPipe,
    ReportInfoCardComponent,
  ],
})
export class ExploreDetailPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  showDropdownMenu = false;
  report: Report | null = null;
  userId: string = this.userService.getUser()?.id ?? '';
  nearbyReports: Report[] = [];

  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  mapId = environment.googleMapId;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 17;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
    gestureHandling: 'greedy',
  };
  markerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  reportPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {
    this.appConfigService.setPageTitle('Detail Laporan');
    this.appConfigService.setShowBackButton(true);
  }

  goToReportDetail(reportId: string) {
    this.isLoading = true;
    this.router.navigate(['explore/detail', reportId]);
  }

  getReportDetailData(reportId: string) {
    return this.reportService.getReportDetail(reportId);
  }

  deleteReport() {
    if (!this.report) return;

    this.reportService.deleteReport(this.report.id).subscribe({
      next: () => {
        this.router.navigate(['/explore']);
        this.notificationService.showNotification(
          'Laporan terhapus',
          NotificationType.SNACKBAR_SUCCESS
        );
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

  likeReport() {
    if (this.report) {
      this.report.is_reacted = true;

      this.reportService.likeReport(this.report.id).subscribe();
      this.report.total_reaction += 1;
    }
  }

  unlikeReport() {
    if (this.report) {
      this.report.is_reacted = false;
      if (this.report.total_reaction > 0) {
        this.reportService.unlikeReport(this.report.id).subscribe();
        this.report.total_reaction -= 1;
      }
    }
  }

  reactToNearbyReport(reportId: string, isLiked: boolean) {
    if (this.nearbyReports.length > 0) {
      const nearbyReport = this.nearbyReports.find(
        (report) => report.id === reportId
      );
      if (!nearbyReport) {
        return;
      }
      if (isLiked) {
        nearbyReport.is_reacted = false;
        if (nearbyReport.total_reaction > 0) {
          this.reportService.unlikeReport(nearbyReport.id).subscribe();
          nearbyReport.total_reaction -= 1;
        }
      } else {
        nearbyReport.is_reacted = true;
        this.reportService.likeReport(nearbyReport.id).subscribe();
        nearbyReport.total_reaction += 1;
      }
    }
  }

  getNearbyReports(reportId: string, geoHash: string) {
    return this.reportService.getNearbyReports({
      geo_hash: geoHash,
      report_id: reportId,
    });
  }

  triggerSnackBar(isError: boolean) {
    if (isError) {
      this.notificationService.showNotification(
        'This is a snackbar error',
        NotificationType.SNACKBAR_ERROR
      );
    } else {
      this.notificationService.showNotification(
        'This is a snackbar success',
        NotificationType.SNACKBAR_SUCCESS
      );
    }
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.paramMap
      .pipe(
        switchMap(async (params) => params.get('reportId')),
        switchMap((reportId) => {
          if (!reportId) {
            throw new Error('Report not found');
          }
          return this.getReportDetailData(reportId);
        }),
        switchMap((report) => {
          if (!report) {
            throw new Error('Report not found');
          }
          return combineLatest([
            of(report),
            this.getNearbyReports(report.id, report.location.geo_hash),
          ]);
        }),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe({
        next: ([report, nearbyReport]) => {
          this.report = report;
          this.nearbyReports = nearbyReport;
          this.center = {
            lat: report.location.latitude,
            lng: report.location.longitude,
          };
          this.reportPosition = this.center;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching report detail:', error);
          this.notificationService.showNotification(
            'Gagal mengambil data dari server. Silakan coba lagi atau kembali ke halaman sebelumnya.',
            NotificationType.SNACKBAR_ERROR
          );
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.appConfigService.setShowBackButton(false);
  }
}
