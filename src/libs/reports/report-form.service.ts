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

import { UserService } from '../users/user.service';
import { CreateReportDTO } from './dto/create-report.dto';

interface SasUrlResponseDTO {
  sas_url: string;
  access_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportFormService {
  private baseUrl = environment.baseUrl;
  private _imageData = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient, private userService: UserService) {}

  $imageData() {
    return this._imageData.asObservable();
  }

  setImageData(value: string | undefined) {
    this._imageData.next(value);
  }

  private requestSASUrl(mimeType: string): Observable<SasUrlResponseDTO> {
    return this.http.get<SasUrlResponseDTO>(
      `${this.baseUrl}/reports/image-upload-url?mime_type=${mimeType}`
    );
  }

  private sendReportData(dto: CreateReportDTO) {
    const campaignId = this.userService.getUser()?.active_campaign_id;

    return this.http.post(`${this.baseUrl}/reports`, {
      ...dto,
      campaign_id: campaignId,
    });
  }

  submitReport(
    formData: Pick<
      CreateReportDTO,
      | 'category'
      | 'categoryRemark'
      | 'subCategories'
      | 'subCategoryRemark'
      | 'condition'
      | 'latitude'
      | 'longitude'
    >
  ) {
    return this.requestSASUrl('image/png').pipe(
      mergeMap((res) => {
        return combineLatest([of(res), this.uploadImage(res.sas_url)]);
      }),
      mergeMap(([sasAndAccessUrl, res2]) =>
        this.sendReportData({
          ...formData,
          image_url: sasAndAccessUrl.access_url,
        })
      ),
      catchError((error) => {
        throw error;
      })
    );
  }

  private uploadImage(url: string) {
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
