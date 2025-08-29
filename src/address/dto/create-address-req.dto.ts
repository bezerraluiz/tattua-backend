import { Address } from "address/adress.model";

export interface CreateAddressReqDto
  extends Omit<Address, "id" | "uid" | "created_at" | "updated_at"> {}
