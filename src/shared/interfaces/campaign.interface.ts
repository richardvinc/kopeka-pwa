export interface Campaign {
  id: string;
  shortcode: string;
  created_by: {
    id: string;
    username: string;
  };
  total_campaigners: number;
  total_reports: number;
  expired_at: Date;
  start_date: Date;
  created_at: Date;
  updated_at?: Date;
}
