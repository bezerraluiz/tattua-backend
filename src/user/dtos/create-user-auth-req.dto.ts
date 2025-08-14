import { User } from "user/user.model";

export interface CreateUserAuthReqDto
  extends Pick<User, "email" | "studioName" | "taxId"> {
  password: string;
}
