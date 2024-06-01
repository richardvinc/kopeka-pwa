import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponsePagination } from '@app/shared/interfaces/base-response.interface';
import { Report } from '@app/shared/interfaces/report.interface';

import { GetLatestReportDTO } from './dto/get-latest-report.dto';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getLatestReport(
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
}
