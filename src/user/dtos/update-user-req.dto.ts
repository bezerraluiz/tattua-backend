import { User } from "user/user.model";

export interface UpdateUserReqDto
  extends Partial<Pick<User, "uid" | "email" | "studio_name" | "tax_id" | "address_id">> {
  password?: string;
}
