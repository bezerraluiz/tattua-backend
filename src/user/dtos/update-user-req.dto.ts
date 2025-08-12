import { User } from "user/user.model";

export interface UpdateUserReqDto
  extends Omit<User, "uid" | "createdAt" | "updatedAt"> {}
