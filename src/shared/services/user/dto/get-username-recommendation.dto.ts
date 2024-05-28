export interface GetUsernameRecommendationRequestDTO {
  already_recommended_usernames: string[];
}

export interface GetUsernameRecommendationResponseDTO {
  data: string[];
}
