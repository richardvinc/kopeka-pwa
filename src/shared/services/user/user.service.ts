import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/shared/interfaces/base-response.interface';
import { User } from '@app/shared/interfaces/user.interface';

import { CreateUsernameRequestDTO } from './dto/create-username.dto';
import {
  GetUsernameRecommendationRequestDTO,
  GetUsernameRecommendationResponseDTO,
} from './dto/get-username-recommendation.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSelf(): Observable<User | null> {
    return this.http.get<BaseResponse<User>>(`${this.baseUrl}/users/self`).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  isHavingUsername(): Observable<boolean> {
    return this.getSelf().pipe(
      map((user) => {
        return !!user?.username;
      })
    );
  }

  getUsernameRecommendations(
    alreadyRecommendedUsernames?: GetUsernameRecommendationRequestDTO
  ): Observable<string[]> {
    return this.http
      .post<GetUsernameRecommendationResponseDTO>(
        `${this.baseUrl}/users/username/recommendations`,
        alreadyRecommendedUsernames
      )
      .pipe(map((res) => res.data));
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/users/username/${username}/is-exists`
    );
  }

  createUsername(user: CreateUsernameRequestDTO): Observable<User> {
    return this.http
      .post<BaseResponse<User>>(`${this.baseUrl}/users/username`, user)
      .pipe(map((res) => res.data));
  }
}
