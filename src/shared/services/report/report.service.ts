import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BaseResponse,
  BaseResponsePagination,
} from '@app/shared/interfaces/base-response.interface';
import { Report } from '@app/shared/interfaces/report.interface';

import { GetLatestReportDTO } from './dto/get-latest-report.dto';
import { GetNearbyReportsDTO } from './dto/get-nearby-report.dto';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getLatestReports(
    dto: GetLatestReportDTO
  ): Observable<{ reports: Report[]; nextToken: string | null }> {
    return this.http
      .get<BaseResponsePagination<Report[]>>(`${this.baseUrl}/reports/latest`, {
        params: {
          next_token: dto.next_token ?? '',
        },
      })
      .pipe(
        map((res) => {
          return { reports: res.data, nextToken: res.nextToken };
        })
      );
  }

  getNearbyReports(dto: GetNearbyReportsDTO): Observable<Report[]> {
    let params: HttpParams = new HttpParams();
    if (dto.latitude && dto.longitude) {
      params = params.set('latitude', dto.latitude);
      params = params.set('longitude', dto.longitude);
    } else if (dto.geo_hash && dto.report_id) {
      params = params.set('geo_hash', dto.geo_hash);
      params = params.set('report_id', dto.report_id);
    }
    return this.http
      .get<BaseResponse<Report[]>>(`${this.baseUrl}/reports/nearby`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getReportDetail(reportId: string): Observable<Report> {
    return this.http
      .get<BaseResponse<Report>>(`${this.baseUrl}/reports/${reportId}`)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getReportsByCampaignId(campaignId: string): Observable<Report[]> {
    return this.http
      .get<BaseResponse<Report[]>>(
        `${this.baseUrl}/reports/campaign/${campaignId}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  deleteReport(reportId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/reports/${reportId}`);
  }

  likeReport(reportId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reports/${reportId}/like`, {});
  }

  unlikeReport(reportId: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/reports/${reportId}/unlike`,
      {}
    );
  }
}
