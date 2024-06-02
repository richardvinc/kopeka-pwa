import { catchError, combineLatest, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '@app/shared/interfaces/report.interface';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import { ReportService } from '@app/shared/services/report/report.service';

@Component({
  selector: 'app-explore-detail-page',
  standalone: true,
  templateUrl: './explore-detail-page.component.html',
  imports: [CommonModule, GoogleMap, MapMarker],
})
export class ExploreDetailPageComponent implements OnInit {
  isLoading = false;
  report: Report | null = null;
  nearbyReports: Report[] = [];

  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  mapId = environment.googleMapId;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 17;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
  };
  markerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  reportPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService
  ) {
    this.appConfigService.setPageTitle('Report Detail');
  }

  goToReportDetail(reportId: string) {
    this.router.navigate(['explore/detail', reportId]);
  }

  getReportDetailData(reportId: string) {
    return this.reportService.getReportDetail(reportId);
  }

  getNearbyReports(reportId: string, geoHash: string) {
    return this.reportService.getNearbyReports({
      geo_hash: geoHash,
      report_id: reportId,
    });
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
            lat: report.location.lat,
            lng: report.location.lon,
          };
          this.reportPosition = this.center;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching report detail:', error);
          this.isLoading = false;
        },
      });
  }
}
