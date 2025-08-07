export interface User {
  id: number;
  uid: string;
  studioName: string;
  cpfcnpj: string;
  password: string;
  valueCm?: string;
  valueNeedle?: string;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
}
