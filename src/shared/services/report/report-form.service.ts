import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportFormService {
  private _imageData = new BehaviorSubject<string | undefined>(undefined);
  private _locationData = new BehaviorSubject<string | undefined>(undefined);

  $imageData() {
    return this._imageData.asObservable();
  }
  $locationData() {
    return this._locationData.asObservable();
  }

  setImageData(value: string | undefined) {
    this._imageData.next(value);
  }

  setLocationData(value: string | undefined) {
    this._locationData.next(value);
  }
}
