import { Address } from "address/adress.model";

export interface CreateAddressReqDto
  extends Omit<Address, "id" | "uid" | "createdAt" | "updatedAt"> {}
