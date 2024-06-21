import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService,
  NotificationType,
} from '@app/shared/services/notification/notification.service';
import { UserService } from '@app/shared/services/user/user.service';

import { AdvocationSvgComponent } from './components/advocation-svg.component';
import { PermissionSvgComponent } from './components/permission-svg.component';
import { PersonalDataSvgComponent } from './components/personal-data-svg.component';
import { WelcomeSvgComponent } from './components/welcome-svg.component';

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
  templateUrl: './onboarding-page.component.html',
  imports: [
    PermissionSvgComponent,
    AdvocationSvgComponent,
    PersonalDataSvgComponent,
    WelcomeSvgComponent,
  ],
})
export class OnboardingPageComponent {
  srcObject: MediaStream | undefined = undefined;
  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  async requestPermission() {
    try {
      this.requestLocationPermission();
      await this.requestCameraPermission();
    } catch (error) {
      this.notificationService.showNotification(
        `Pastikan kamu memberi akses lokasi dan kamera untuk menggunakan aplikasi ini.`,
        NotificationType.ALERT
      );
      return;
    }

    // update user onboarding status
    this.userService
      .updateSelf({
        is_onboarded: true,
      })
      .subscribe({
        next: (user) => {
          console.log('User onboarding status updated');
          this.notificationService.showNotification(
            `Selamat datang ${user.username}!`,
            NotificationType.SNACKBAR_SUCCESS
          );
          this.router.navigate(['/explore']);
        },
        error: () => {
          console.log('Failed to update user onboarding status');
        },
      });
  }

  denyPermission() {
    const answer = confirm(
      `Apakah kamu yakin? Kamu tidak dapat menggunakan aplikasi ini tanpa akses kamera dan lokasi dan
      kamu akan diarahkan ke halaman login awal. Kamu tetap bisa melihat laporan di peta.kopeka.id`
    );
    if (answer) {
      this.router.navigate(['/logout']);
    }
  }

  private requestLocationPermission() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          `user location permission granted: ${position.coords.latitude}, ${position.coords.longitude}`
        );
      },
      (error) => this.permissionAccessErrorHandler,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10,
      }
    );
  }

  private async requestCameraPermission() {
    await navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        this.srcObject = stream;
        console.log('user camera permission granted');
        this.stopCamera();
      })
      .catch(this.permissionAccessErrorHandler);
  }

  private stopCamera() {
    // stop stream
    this.srcObject?.getTracks().forEach((track) => {
      track.stop();
    });
  }

  permissionAccessErrorHandler(error?: Error) {
    console.log(error);
    this.stopCamera();
    console.log(
      'Something error happened while requesting permission. Please try again later.'
    );
    throw new Error('Permission request failed');
  }
}
