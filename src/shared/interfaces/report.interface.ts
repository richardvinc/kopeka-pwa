export interface Report {
  id: string;
  location: { lat: number; lon: number; geo_hash: string };
  image_url: string;
  total_reaction: number;
  is_reacted: boolean;
  reported_by: { id: string; username: string };
  category: string;
  condition: string;
  created_at: string;
  updated_at: string | null;
}
