import { tap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NotificationService,
  SnackBarMessage,
} from '@app/shared/services/notification/notification.service';

import { ContainerComponent } from '../shared/components/container/container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ContainerComponent, RouterOutlet, CommonModule],
})
export class AppComponent {
  @ViewChild('snackbar') snackBarDivRef: HTMLDivElement | undefined = undefined;
  isSnackbarOpen = false;
  isErrorSnackbar = false;
  errorMessage = '';

  constructor(private errorNotificationService: NotificationService) {
    this.errorNotificationService
      .getSnackBarMessage()
      .pipe(
        tap((snackBarMessageOrNull) => {
          if (snackBarMessageOrNull?.message) {
            this.isSnackbarOpen = true;
            this.isErrorSnackbar =
              snackBarMessageOrNull.type === 'error' ? true : false;
          }
        })
      )
      .subscribe({
        next: (message: SnackBarMessage | null) => {
          if (message) {
            this.errorMessage = message.message;

            // for success, close the snackbar after 2.5 seconds
            if (message.type === 'success') {
              setTimeout(() => {
                this.closeSnackbar();
              }, 1500);
            }
          }
        },
      });
  }

  closeSnackbar() {
    this.errorNotificationService.hideSnackBar();
    this.isSnackbarOpen = false;
  }
}
