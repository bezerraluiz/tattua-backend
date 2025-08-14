import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { User } from "./user.model";
import type { UpdateUserReqDto } from "./dtos/update-user-req.dto";

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
      password: user.password,
    })
    .eq('id', user.id)
    .select();

    if (error) throw new Error(error.message);

    if (!data) throw new UserNotFoundError("Not users found");

    return data;
};

// TODO DeleteUser
export const DeleteUser = async () => {};

// TODO CreateUserAuth
export const CreateUserAuth = async (user:) => {
  const { data, error } = await supabase.auth.signUp({
    email: ,
    password,
    options: {
      data: {
        studio_name: 
      }
    }
  });
};