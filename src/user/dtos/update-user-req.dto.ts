import { User } from "user/user.model";

export interface UpdateUserReqDto
  extends Pick<User, "id" | "email" | "studio_name" | "tax_id" | "address_id"> {
  password: string;
}
