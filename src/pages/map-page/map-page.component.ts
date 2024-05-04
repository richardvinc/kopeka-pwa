import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { AppConfigService } from '@app/shared/services/config/app/app-config.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  imports: [GoogleMap],
})
export class MapPageComponent implements AfterViewInit {
  @ViewChild('mapContainer') mapContainerRef:
    | ElementRef<HTMLDivElement>
    | undefined = undefined;
  @ViewChild('googleMap') mapRef: GoogleMap | undefined = undefined;
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  height = 800;
  width = 400;
  mapOption: google.maps.MapOptions = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
  };

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.setPageTitle('Map');
  }

  ngAfterViewInit(): void {
    this.height = this.mapContainerRef?.nativeElement.offsetHeight || 800;
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

  resetMapLocation() {}
}
