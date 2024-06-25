export interface Campaign {
  id: string;
  shortcode: string;
  description?: string;
  image_url?: string;
  created_by: {
    id: string;
    username: string;
  };
  total_campaigners: number;
  total_reports: number;
  ended_at?: Date;
  expired_at: Date;
  start_date: number;
  created_at: number;
  updated_at?: number;
}
