import { User } from "user/user.model";

export interface CreateUserReqDto
  extends Omit<User, "id" | "uid" | "createdAt" | "updatedAt"> {}
