import { User } from "user/user.model";

export interface CreateUserReqDto
  extends Pick<User, "email" | "studio_name" | "tax_id" | "address_id"> {
  password: string;
}
