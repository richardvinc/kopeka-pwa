import { Buffer } from 'buffer';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  mergeMap,
  Observable,
  of,
} from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GPSLocation } from '@app/shared/interfaces/gps-location.interface';

import { CreateReportDTO } from './dto/create-report.dto';

interface SasUrlResponseDTO {
  sas_url: string;
  access_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportFormService {
  baseUrl = environment.baseUrl;
  private _imageData = new BehaviorSubject<string | undefined>(undefined);
  private _locationData = new BehaviorSubject<GPSLocation | undefined>({
    latitude: 0,
    longitude: 1,
  });

  constructor(private http: HttpClient) {}

  $imageData() {
    return this._imageData.asObservable();
  }
  $locationData() {
    return this._locationData.asObservable();
  }

  setImageData(value: string | undefined) {
    this._imageData.next(value);
  }

  setLocationData(value: GPSLocation | undefined) {
    this._locationData.next(value);
  }

  private requestSASUrl(mimeType: string): Observable<SasUrlResponseDTO> {
    console.log('Requesting SAS Token for:', mimeType);
    return this.http.get<SasUrlResponseDTO>(
      `${this.baseUrl}/reports/image-upload-url?mime_type=${mimeType}`
    );
  }

  private sendReportData(dto: CreateReportDTO) {
    console.log('Sending report data');
    return this.http.post(`${this.baseUrl}/reports`, {
      lat: dto.lat,
      lon: dto.lon,
      image_url: dto.image_url,
      category: dto.category,
      condition: dto.condition,
    });
  }

  submitReport(formData: { category: string; condition: string }) {
    return this.requestSASUrl('image/png').pipe(
      mergeMap((res) => {
        return combineLatest([of(res), this.uploadImage(res.sas_url)]);
      }),
      mergeMap(([sasAndAccessUrl, res2]) =>
        this.sendReportData({
          category: formData.category,
          condition: formData.condition,
          image_url: sasAndAccessUrl.access_url,
          lat: this._locationData.value!.latitude,
          lon: this._locationData.value!.longitude,
        })
      ),
      catchError((error) => {
        throw error;
      })
    );
  }

  private uploadImage(url: string) {
    console.log('Uploading image to:', url);
    const base64ImageData = this._imageData.value;
    if (!base64ImageData) {
      return of(null);
    }

    const data = base64ImageData.replace(/^data:image\/\w+;base64,/, '');
    const buff = Buffer.from(data, 'base64');

    return this.http.put(url, buff.buffer, {
      headers: { 'Content-Type': 'image/png', 'x-ms-blob-type': 'BlockBlob' },
    });
  }
}
