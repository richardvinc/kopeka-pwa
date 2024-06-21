import { environment } from 'src/environments/environment';

import { CommonModule, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { ReportFormService } from '@app/libs/reports/report-form.service';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';

@Component({
  selector: 'app-report-form-page',
  standalone: true,
  templateUrl: './report-form-page.component.html',
  imports: [CommonModule, ReactiveFormsModule, GoogleMap, MapMarker],
})
export class ReportFormPageComponent {
  // map properties
  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  mapId = environment.googleMapId;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
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
  userPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  // form properties
  isSubmitting = false;
  reportForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    condition: new FormControl('', Validators.required),
  });

  categories: { id: string; name: string; selected: boolean }[] = [
    { id: 'SIDEWALK', name: 'Trotoar', selected: false },
    { id: 'ZEBRA_CROSS', name: 'Zebra Cross', selected: false },
    { id: 'PELICAN_CROSSING', name: 'Pelican Crossing', selected: false },
    { id: 'PEDESTRIAN_BRIDGE', name: 'JPO', selected: false },
    { id: 'OTHER', name: 'Lainnya', selected: false },
  ];
  imageData: string | undefined = undefined;

  constructor(
    private appConfigService: AppConfigService,
    private reportFormService: ReportFormService,
    private router: Router,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.appConfigService.setPageTitle('Laporan');
    this.reportFormService.$imageData().subscribe((data) => {
      if (!data) {
        this.router.navigate(['/explore']);
      }
      this.imageData = data;
    });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.userPosition = this.center;
      },
      alert,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10,
      }
    );
  }

  // form getters
  get condition(): string {
    return this.reportForm.get('condition')?.value;
  }
  get category(): string {
    return this.reportForm.get('condition')?.value;
  }

  onCenterChanged() {
    this.userPosition = {
      lat: this.mapRef!.getCenter()?.lat() || this.userPosition.lat,
      lng: this.mapRef!.getCenter()?.lng() || this.userPosition.lng,
    };
    console.log('User position:', this.userPosition);
  }

  retakePhoto() {
    // navigate back to camera page
    this.location.back();
  }

  selectCategory(id: string) {
    this.categories.map((category) => {
      if (category.id === id) {
        category.selected = true;
        this.reportForm.controls['category'].setValue(category.id);
      } else {
        category.selected = false;
      }
    });
  }

  selectCondition(condition: 'GOOD' | 'BAD') {
    this.reportForm.controls['condition'].setValue(condition);
  }

  submitForm() {
    console.log('Submiting Report...');
    this.isSubmitting = true;
    this.reportFormService
      .submitReport({
        category: this.reportForm.controls['category'].value,
        condition: this.reportForm.controls['condition'].value,
        location: {
          latitude: this.userPosition.lat,
          longitude: this.userPosition.lng,
        },
      })
      .subscribe({
        next: (response) => {
          this.notificationService.showNotification(
            'Laporan berhasil dikirim!',
            NotificationType.SNACKBAR_SUCCESS
          );
          this.router.navigate(['/explore']);
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error submitting report:', error);
          this.notificationService.showNotification(
            'Laporan gagal dikirim. Silakan coba lagi.',
            NotificationType.SNACKBAR_ERROR
          );
          this.isSubmitting = false;
        },
      });
  }
}
