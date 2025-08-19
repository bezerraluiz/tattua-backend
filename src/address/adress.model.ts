export interface Address {
  id: number;
  uid: string;
  user_id: number;
  country: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: Date;
  updated_at: Date;
}
