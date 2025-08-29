import { User } from "user/user.model";

export interface UpdateUserReqDto
  extends Partial<Pick<User, "email" | "studio_name" | "tax_id">> {
  uid: string;
  password?: string;
}
