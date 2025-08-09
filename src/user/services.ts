import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";
import { UserAlreadyExists } from "errors/user-already-exists.error";

interface GetUsers {
  data: [];
  status: number;
  statusText: string;
}

export const GetUsers = async (): Promise<any[] | void> => {
  const { data, error } = await supabase.from("users").select();

  if (error) throw new Error(error.message);

  if (!data) throw new UserNotFoundError("No users found");

  return data;
};

export const CreateUser = async (
  user: CreateUserReqDto
): Promise<any> => {
  const { data, error } = await supabase.from("users").insert({
    studioName: user.studioName,
    taxId: user.taxId,
    password: user.password,
    addressId: user.addressId,
  });

  if (error) throw new Error(error.message);

  if (!data) throw new UserAlreadyExists("User already registered");

  return data
};
