import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/shared/interfaces/user.interface';

import { CreateUserDTO } from './dto/create-user.dto';
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
    return this.http.get<User>(`${this.baseUrl}/users/self`);
  }

  isHavingUsername(): Observable<boolean> {
    return this.getSelf().pipe(map((user) => !!user?.username));
  }

  getUsernameRecommendations(
    alreadyRecommendedUsernames?: GetUsernameRecommendationRequestDTO
  ): Observable<GetUsernameRecommendationResponseDTO> {
    return this.http.post<GetUsernameRecommendationResponseDTO>(
      `${this.baseUrl}/users/username/recommendations`,
      alreadyRecommendedUsernames
    );
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/users/username/${username}/is-exists`
    );
  }

  createUser(user: CreateUserDTO): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }
}
