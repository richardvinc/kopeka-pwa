import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/libs/users/interfaces/user.interface';
import { BaseResponse } from '@app/shared/interfaces/base-response.interface';

import { CreateUsernameRequestDTO } from './dto/create-username.dto';
import {
  GetUsernameRecommendationRequestDTO,
  GetUsernameRecommendationResponseDTO,
} from './dto/get-username-recommendation.dto';
import { UpdateUserRequestDTO } from './dto/update-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private user: User | null = null;

  constructor(private http: HttpClient) {}

  getUser(): User | null {
    return this.user;
  }

  getSelf(): Observable<User | null> {
    return this.http.get<BaseResponse<User>>(`${this.baseUrl}/users/self`).pipe(
      map((res) => {
        this.user = res.data;
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

  isOnboarded(): Observable<boolean> {
    return this.getSelf().pipe(
      map((user) => {
        return !!user?.is_onboarded;
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

  updateSelf(dto: UpdateUserRequestDTO): Observable<User> {
    return this.http
      .put<BaseResponse<User>>(`${this.baseUrl}/users/self`, dto)
      .pipe(map((res) => res.data));
  }
}
