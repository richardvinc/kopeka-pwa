export interface User {
  id: string;
  username?: string;
  profile_picture_url: string;
  is_onboarded: boolean;
  active_campaign_id?: string;
  createdAt: number;
  updatedAt?: number;
}
