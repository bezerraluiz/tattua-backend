import { Address } from "address/adress.model";

export interface UpdateAddressReqDto
  extends Partial<Omit<Address, "id" | "uid" | "created_at" | "updated_at">> {
    user_id: number;
  }
