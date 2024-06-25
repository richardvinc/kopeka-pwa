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
  currentPostedLocation: GeolocationPosition | null = null;

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
        this.currentLocation = position;
        console.log('User position updated: ', position);
        callback(position);
        if (this.campaignId) {
          this.postUserCampaignLocation(position, this.campaignId);
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
    // if user is not moving, don't post location
    if (!this.currentPostedLocation) {
      this.currentPostedLocation = position;
    } else if (
      this.currentPostedLocation.coords.latitude === position.coords.latitude &&
      this.currentPostedLocation.coords.longitude === position.coords.longitude
    ) {
      return;
    }

    console.log(
      'user is campaigning and moving, posting location to server...'
    );
    this.campaignService.postUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      campaign_id: campaignId,
    });
    this.currentPostedLocation = position;
  }

  clearWatch() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}
