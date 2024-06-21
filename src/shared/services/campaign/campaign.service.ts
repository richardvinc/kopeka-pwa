import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/shared/interfaces/base-response.interface';
import { Campaign } from '@app/shared/interfaces/campaign.interface';

import { CreateCampaignDTO } from './dto/create-campaign.dto';
import { PostUserLocationDTO } from './dto/post-user-location.dto';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createCampaign(dto: CreateCampaignDTO): Observable<Campaign> {
    return this.http
      .post<BaseResponse<Campaign>>(`${this.baseUrl}/campaigns`, dto)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getCampaignById(campaignId: string): Observable<Campaign | null> {
    return this.http
      .get<BaseResponse<Campaign>>(`${this.baseUrl}/campaigns/id/${campaignId}`)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  getCampaignByShortcode(
    campaignShortcode: string
  ): Observable<Campaign | null> {
    return this.http
      .get<BaseResponse<Campaign>>(
        `${this.baseUrl}/campaigns/shortcode/${campaignShortcode}`
      )
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }

  joinCampaign(campaignShortcode: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/campaigns/shortcode/${campaignShortcode}/join`,
      {}
    );
  }

  leaveCampaign(campaignShortcode: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/campaigns/shortcode/${campaignShortcode}/leave`,
      {}
    );
  }

  postUserLocation(dto: PostUserLocationDTO): void {
    this.http
      .post(`${this.baseUrl}/campaigns/journey/location`, dto)
      .subscribe();
  }
}
