import { supabaseAdmin } from "server";
import { UserNotFoundError } from "errors/user-not-found.error";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { User } from "./user.model";
import type { UpdateUserReqDto } from "./dtos/update-user-req.dto";
import type { CreateUserReqDto } from "./dtos/create-user-req.dto";

interface GetUsers {
  data: [];
  status: number;
  statusText: string;
}

export const GetUsers = async (): Promise<User[]> => {
  const { data, error } = await supabaseAdmin.from("users").select();

  if (error) throw new Error(error.message);

  if (data.length == 0) throw new UserNotFoundError("No users found");

  return data;
};

export const GetUserByCpfcnpj = async (tax_id: string) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("tax_id")
    .eq("tax_id", tax_id);

  if (error) throw new Error(error.message);

  if (data.length != 0) throw new UserAlreadyExists("User already exists");

  return data;
};

export const CreateUser = async (user: CreateUserReqDto) => {
  const { data, error } = await supabaseAdmin.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        studio_name: user.studio_name,
        tax_id: user.tax_id,
        address_id: user.address_id,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// TODO UpdateUser
export const UpdateUser = async (user: UpdateUserReqDto) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .update({
      studio_name: user.studio_name,
      email: user.email,
      address_id: user.address_id,
      password: user.password,
    })
    .eq("id", user.id)
    .select();

  if (error) throw new Error(error.message);

  if (!data) throw new UserNotFoundError("Not users found");

  return data;
};

// TODO DeleteUser
export const DeleteUser = async () => {};