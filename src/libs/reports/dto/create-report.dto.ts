export interface CreateReportDTO {
  latitude: number;
  longitude: number;
  image_url: string;
  category: string;
  categoryRemark?: string;
  subCategories?: string[];
  subCategoryRemark?: string;
  condition: string;
  campaign_id?: string;
}
