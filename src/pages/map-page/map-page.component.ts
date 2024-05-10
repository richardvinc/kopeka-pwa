import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapMarker } from '@angular/google-maps';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  imports: [GoogleMap, MapMarker, CommonModule, MapAdvancedMarker],
})
export class MapPageComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainerRef: ElementRef | undefined =
    undefined;
  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 16;
  height = 800;
  width = 400;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
  };
  markerOption: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false,
  };
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

  markers: google.maps.LatLngLiteral[] = [];

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Peta');
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.userPosition = this.center;
    }, alert);
  }

  ngAfterViewInit(): void {
    this.height = window.innerHeight || 800;
    this.width = this.mapContainerRef?.nativeElement.offsetWidth || 400;
    if (this.mapRef) {
      this.mapRef.height = this.height;
      this.mapRef.width = this.width;
      console.log('Resize map to ', this.mapRef.height, this.mapRef.width);
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng ? event.latLng.toJSON() : this.center;
  }

  resetMapLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    }, alert);
  }
}
