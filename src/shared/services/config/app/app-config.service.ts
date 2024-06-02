import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private pageTitle: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Kopeka'
  );
  private showBackButton: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private browserTitle: Title) {}

  public getPageTitle(): Observable<string> {
    return this.pageTitle.asObservable();
  }

  public getShowBackButton(): Observable<boolean> {
    return this.showBackButton.asObservable();
  }

  setPageTitle(title: string) {
    this.browserTitle.setTitle(title);
    this.pageTitle.next(title);
  }

  setShowBackButton(show: boolean) {
    this.showBackButton.next(show);
  }
}
