import { Injectable } from '@angular/core';

import {
  NotificationService,
  NotificationType,
} from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  watchId: number | undefined = undefined;
  currentLocation: GeolocationPosition | null = null;

  constructor(private notificationService: NotificationService) {}

  getCurrentPosition(): GeolocationPosition | null {
    return this.currentLocation;
  }

  watchPosition(callback: (position: GeolocationPosition) => void) {
    if (this.watchId) this.clearWatch();

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log('User position updated: ', position);
        this.currentLocation = position;
        callback(position);
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

  clearWatch() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}
