import { BaseResponse } from '@app/shared/interfaces/base-response.interface';

export interface GetUsernameRecommendationRequestDTO {
  already_recommended_usernames: string[];
}

export interface GetUsernameRecommendationResponseDTO
  extends BaseResponse<string[]> {}
