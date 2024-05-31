import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';
import { ReportFormService } from '@app/shared/services/report/report-form.service';

@Component({
  selector: 'app-report-form-page',
  standalone: true,
  templateUrl: './report-form-page.component.html',
  imports: [CommonModule, GoogleMap, MapMarker],
})
export class ReportFormPageComponent {
  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  mapId = environment.googleMapId;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 17;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
  };
  markerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
  userPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  categories: { id: string; name: string; selected: boolean }[] = [
    { id: 'ZEBRA_CROSS', name: 'Zebra Cross', selected: false },
    { id: 'SIDEWALK', name: 'Trotoar', selected: false },
    { id: 'PELICAN_CROSSING', name: 'Pelican Crossing', selected: false },
    { id: 'OTHER', name: 'Lainnya', selected: false },
  ];
  condition: 'GOOD' | 'BAD' | null = null;
  imageData: string | undefined = undefined;

  constructor(
    private appConfigService: AppConfigService,
    private reportFormService: ReportFormService,
    private router: Router
  ) {
    this.appConfigService.setPageTitle('Laporan');
    this.reportFormService.$imageData().subscribe((data) => {
      if (!data) {
        this.router.navigate(['/explore']);
      }
      this.imageData = data;
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.userPosition = this.center;
    }, alert);
  }

  onCenterChanged() {
    this.userPosition = {
      lat: this.mapRef!.getCenter()?.lat() || this.userPosition.lat,
      lng: this.mapRef!.getCenter()?.lng() || this.userPosition.lng,
    };
    console.log('User position:', this.userPosition);
  }

  selectCategory(id: string) {
    this.categories.map((category) => {
      if (category.id === id) {
        category.selected = !category.selected;
      } else {
        category.selected = false;
      }
    });
  }

  toggleCondition(condition: 'GOOD' | 'BAD') {
    this.condition = condition;
  }

  submitReport() {
    console.log('Submiting Report...');
    const selectedCategories = this.categories.filter(
      (category) => category.selected
    );
    this.reportFormService
      .submitReport({
        category: selectedCategories.filter((category) => category.selected)[0]
          .id,
        condition: this.condition || 'GOOD',
      })
      .subscribe({
        next: (response) => {
          console.log('Report submitted:', response);
          this.router.navigate(['/explore']);
        },
        error: (error) => {
          console.error('Error submitting report:', error);
        },
      });
  }
}
