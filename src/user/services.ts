import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { User } from "./user.model";
import type { UpdateUserReqDto } from "./dtos/update-user-req.dto";
import type { CreateUserAuthReqDto } from "./dtos/create-user-auth-req.dto";

interface GetUsers {
  data: [];
  status: number;
  statusText: string;
}

export const GetUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select();

  if (error) throw new Error(error.message);

  if (data.length == 0) throw new UserNotFoundError("No users found");

  return data;
};

export const GetUserByCpfcnpj = async (tax_id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("tax_id")
    .eq("tax_id", tax_id);

  if (error) throw new Error(error.message);

  if (data.length != 0) throw new UserAlreadyExists("User already exists");

  return data;
};

export const CreateUser = async (
  user: CreateUserReqDto
): Promise<User | null> => {
  const { data, error } = await supabase.from("users").insert({
    ...user,
  });

  if (error) {
    if (error.code == "23505") {
      throw new UserAlreadyExists("User already registered");
    }
    throw new Error(error.message);
  }

  return data;
};

// TODO UpdateUser
export const UpdateUser = async (user: UpdateUserReqDto) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      studioName: user.studioName,
      email: user.email,
    })
    .eq("id", user.id)
    .select();

  if (error) throw new Error(error.message);

  if (!data) throw new UserNotFoundError("Not users found");

  return data;
};

// TODO DeleteUser
export const DeleteUser = async () => {};

export const CreateUserAuth = async (user: CreateUserAuthReqDto) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        studio_name: user.studioName,
        tax_id: user.taxId,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};