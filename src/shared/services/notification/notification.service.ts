import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

export enum NotificationType {
  SNACKBAR_ERROR = 'SNACKBAR_ERROR',
  SNACKBAR_SUCCESS = 'SNACKBAR_SUCCESS',
  ALERT = 'ALERT',
  // NOTIFICATION = 'NOTIFICATION',
}

export interface SnackBarMessage {
  message: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBarMessage$: BehaviorSubject<SnackBarMessage | null> =
    new BehaviorSubject<SnackBarMessage | null>(null);

  constructor() {}

  public getSnackBarMessage(): Observable<SnackBarMessage | null> {
    return this.snackBarMessage$.asObservable();
  }

  public hideSnackBar(): void {
    this.snackBarMessage$.next(null);
  }

  public showNotification(message: string, type: NotificationType): void {
    switch (type) {
      // case NotificationType.NOTIFICATION:
      //   this.showErrorNotification(message);
      //   break;
      case NotificationType.SNACKBAR_ERROR:
        this.showErrorSnackBar(message);
        break;
      case NotificationType.SNACKBAR_SUCCESS:
        this.showSuccessSnackBar(message);
        break;
      case NotificationType.ALERT:
        this.showErrorAlert(message);
        break;
      default:
        this.showErrorNotification(message);
        break;
    }
  }

  private showErrorNotification(message: string): void {}

  private showErrorSnackBar(message: string): void {
    this.snackBarMessage$.next({ message, type: 'error' });
  }

  private showSuccessSnackBar(message: string): void {
    this.snackBarMessage$.next({ message, type: 'success' });
  }

  private showErrorAlert(message: string): void {
    alert(message);
  }
}
