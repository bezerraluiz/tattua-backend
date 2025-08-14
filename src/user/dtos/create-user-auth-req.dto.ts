import { User } from "user/user.model";

export interface CreateUserReqDto
  extends Omit<User, "id" | "uid" | "createdAt" | "updatedAt"> {}
export interface CreateUserReqDto {
  email: string;
  password: string;
  studio_name: string;
  tax_id: string;
}