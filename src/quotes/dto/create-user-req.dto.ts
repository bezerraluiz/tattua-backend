
import type { Quote } from "quotes/quote.model";

export interface CreateQuoteReqDto extends Pick<
  Quote,
  | "client_name"
  | "professional_name"
  | "tattoo_size"
  | "difficulty"
  | "body_region"
  | "colors_quantity"
  | "needle_fill"
  | "estimated_hours"
  | "description"
  | "total"
  | "custom_fields"
  | "user_id"
> {}
