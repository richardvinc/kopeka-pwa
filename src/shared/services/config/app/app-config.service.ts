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
  constructor(private browserTitle: Title) {}

  public getPageTitle(): Observable<string> {
    return this.pageTitle.asObservable();
  }

  setPageTitle(title: string) {
    this.browserTitle.setTitle(title);
    this.pageTitle.next(title);
  }
}
