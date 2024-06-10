import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapMarker } from '@angular/google-maps';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';
import { ReportService } from '@app/shared/services/report/report.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  imports: [GoogleMap, MapMarker, CommonModule, MapAdvancedMarker],
})
export class MapPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainerRef: ElementRef | undefined =
    undefined;
  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 16;
  height = 800;
  width = 400;
  watchId: number | undefined = undefined;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
  };
  markerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  isReadyToDragMap = true;
  isReadyToUpdateUserPosition = true;
  userPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  parser = new DOMParser();
  pinHtmlElement = this.parser.parseFromString(
    `<span class="relative flex h-3 w-3">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
    <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
  </span>`,
    'text/html'
  ).documentElement;
  userMarkerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
    content: this.pinHtmlElement,
  };
  mapId = environment.googleMapId;

  reportsNearby: google.maps.LatLngLiteral[] = [];
  reportsAroundUser: google.maps.LatLngLiteral[] = [];

  constructor(
    private appConfigService: AppConfigService,
    private reportService: ReportService,
    private notificationService: NotificationService
  ) {
    this.appConfigService.setPageTitle('Peta');
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (this.isReadyToUpdateUserPosition) {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.updateUserPosition();
        }
      },
      (err) => {
        console.log(err);
        this.notificationService.showNotification(
          err.message,
          NotificationType.SNACKBAR_ERROR
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  }

  private updateUserPosition() {
    console.log('User position updated: ', this.center);
    this.userPosition = this.center;
    this.reportsAroundUser = this.getNearbyReports(this.userPosition);
    this.resetUserPositionUpdateTimer();
  }

  private getNearbyReports(
    position: google.maps.LatLngLiteral
  ): google.maps.LatLngLiteral[] {
    const markers: google.maps.LatLngLiteral[] = [];
    this.reportService
      .getNearbyReports({
        latitude: position.lat,
        longitude: position.lng,
      })
      .subscribe((reports) => {
        console.log('Nearby reports found: ', reports.length);
        reports.map((report) => {
          markers.push({
            lat: report.location.latitude,
            lng: report.location.longitude,
          });
        });
      });

    return markers;
  }

  ngAfterViewInit(): void {
    this.height = window.innerHeight || 800;
    this.width = this.mapContainerRef?.nativeElement.offsetWidth || 400;
    if (this.mapRef) {
      this.mapRef.height = this.height;
      this.mapRef.width = this.width;
    }
  }

  moveMap() {
    const center = this.mapRef?.getCenter();
    if (center) {
      this.center = center.toJSON();

      if (this.isReadyToDragMap) {
        console.log('getting nearby reports...');
        this.reportsNearby = this.getNearbyReports(this.center);
        this.resetMapDragTimer();
      }
    }
  }

  // user can only get nearby reports on map drag every 5 seconds
  private resetMapDragTimer() {
    this.isReadyToDragMap = false;
    setTimeout(() => {
      this.isReadyToDragMap = true;
    }, 5000);
  }

  // user can only get nearby report on their position every 15 seconds
  private resetUserPositionUpdateTimer() {
    this.isReadyToUpdateUserPosition = false;
    setTimeout(() => {
      this.isReadyToUpdateUserPosition = true;
    }, 15000);
  }

  resetMapLocation() {
    this.center = this.userPosition;
  }

  ngOnDestroy(): void {
    if (this.watchId) navigator.geolocation.clearWatch(this.watchId);
  }
}
