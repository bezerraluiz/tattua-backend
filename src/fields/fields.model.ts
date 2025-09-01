export interface FixedFields {
  id: number;
  uid: string;
  name: string;
  type: string;
  defaultValue: number; // ex: R$ 16,00 = 1600
  options?: string[];
  createdAt: Date;
};

export interface UserFixedFieldValues {
  id: number;
  uid: string;
  user_id: number;
  fixed_field_id: number;
  custom_value: number; // ex: R$ 16,00 = 1600
  custom_options?: string[];
  updatedAt: Date;
};

export interface CustomFields {
  id: number;
  uid: string;
  user_id: number;
  name: string;
  type: string;
  value: number; // ex: R$ 16,00 = 1600
  options?: string[];
  createdAt: Date;
};