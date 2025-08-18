import { User } from "user/user.model";

export interface CreateUserReqDto
  extends Omit<User, "id" | "uid" | "created_at" | "updated_at"> {}
