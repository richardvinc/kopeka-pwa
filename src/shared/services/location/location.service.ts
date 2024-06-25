import { Injectable } from '@angular/core';
import { CampaignService } from '@app/libs/campaigns/campaign.service';

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
  campaignId: string | undefined;

  constructor(
    private campaignService: CampaignService,
    private notificationService: NotificationService
  ) {}

  getCurrentPosition(): GeolocationPosition | null {
    return this.currentLocation;
  }

  watchPosition(callback: (position: GeolocationPosition) => void) {
    if (!this.watchId) this.clearWatch();

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (
          this.currentLocation &&
          position.coords.latitude === this.currentLocation.coords.latitude &&
          position.coords.longitude === this.currentLocation.coords.longitude
        )
          return;

        console.log('User position updated: ', position);
        callback(position);
        if (this.campaignId) {
          if (
            this.currentLocation &&
            position.coords == this.currentLocation.coords
          )
            return;
          this.postUserCampaignLocation(position, this.campaignId);
        }
        this.currentLocation = position;
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
        timeout: 30000,
        maximumAge: 15000,
      }
    );
  }

  startPostingUserLocation(campaignId: string) {
    this.campaignId = campaignId;
  }

  stopPostingUserLocation() {
    this.campaignId = undefined;
  }

  postUserCampaignLocation(position: GeolocationPosition, campaignId: string) {
    console.log('user is campaigning, posting location to server...');
    this.campaignService.postUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      campaign_id: campaignId,
    });
  }

  clearWatch() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}
