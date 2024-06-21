import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CampaignService } from '@app/libs/campaigns/campaign.service';
import { User } from '@app/libs/users/interfaces/user.interface';
import { UserService } from '@app/libs/users/user.service';
import { LocationService } from '@app/shared/services/location/location.service';

import { BottomMenuComponent } from '../bottom-menu/bottom-menu.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BottomMenuComponent],
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  watchId: number | undefined = undefined;
  currentPosition: GeolocationPosition | null = null;
  user: User | null = null;

  constructor(
    private campaignService: CampaignService,
    private userService: UserService,
    private locationService: LocationService
  ) {
    this.user = this.userService.getUser();
    this.locationService.watchPosition((position) => {
      this.updateUserPosition(position);
    });
  }

  private updateUserPosition(position: GeolocationPosition) {
    if (this.currentPosition === position) return;

    this.currentPosition = position;
    if (this.user?.active_campaign_id) {
      this.campaignService.postUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        campaign_id: this.user.active_campaign_id,
      });
    }
  }
}
