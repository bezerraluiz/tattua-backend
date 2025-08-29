export interface Quote {
  id: string;
  user_id: number;
  client_name: string;
  professional_name: string;
  tattoo_size: string;
  difficulty: string;
  body_region: string;
  colors_quantity: string;
  needle_fill: string;
  estimated_hours: number;
  description?: string;
  total: number;
  custom_fields?: Record<string, any>;
  pdf_url?: string;
  created_at: Date;
}