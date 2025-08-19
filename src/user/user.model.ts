export interface User {
  id: number;
  uid: string;
  studio_name: string;
  email: string;
  tax_id: string;
  address_id?: number;
  created_at: Date;
  updated_at: Date;
}
