import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";

interface GetUsers {
  data: [];
  status: number;
  statusText: string;
}

export const GetUsers = async (): Promise<any[] | void> => {
  const { data, error } = await supabase.from("users").select();

  // TODO tratamento de erros

  if (error) throw new Error(error.message);

  return data;
};

export const CreateUser = async (
  user: CreateUserReqDto
): Promise<object | void> => {
  const { error } = await supabase.from("users").insert({
    studioName: user.studioName,
    taxId: user.taxId,
    password: user.password,
    addressId: user.addressId,
  });

  // TODO return
};
