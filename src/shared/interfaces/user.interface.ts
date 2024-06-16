export interface User {
  id: number;
  username?: string;
  profile_picture_url: string;
  is_onboarded: boolean;
  active_campaign_id?: string;
  createdAt: Date;
  updatedAt?: Date;
}
