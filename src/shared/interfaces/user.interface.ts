export interface User {
  id: number;
  username?: string;
  profile_picture_url: string;
  is_onboarded: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
