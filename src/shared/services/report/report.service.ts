import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
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
          console.log('res', res);
          return { reports: res.data, nextToken: res.nextToken };
        })
      );
  }

  getNearbyReports(dto: GetNearbyReportsDTO): Observable<Report[]> {
    return this.http
      .get<BaseResponse<Report[]>>(`${this.baseUrl}/reports/nearby`, {
        params: {
          geo_hash: dto.geo_hash,
          report_id: dto.report_id,
        },
      })
      .pipe(
        map((res) => {
          console.log('res', res);
          return res.data;
        })
      );
  }

  getReportDetail(reportId: string): Observable<Report> {
    return this.http
      .get<BaseResponse<Report>>(`${this.baseUrl}/reports/${reportId}`)
      .pipe(
        map((res) => {
          console.log('res', res);
          return res.data;
        })
      );
  }
}
