export interface User {
  id: number;
  uid: string;
  studioName: string;
  taxId: string;
  password: string;
  pricePerCm?: string;
  pricePerNeedle?: string;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
}
