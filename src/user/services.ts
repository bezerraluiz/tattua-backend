import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";

interface GetUsers {
  data: [];
  status: number;
  statusText: string;
}

export const GetUsers = async (): Promise<any[] | void> => {
  const { data, error } = await supabase.from("users").select();

  if (error) throw new Error(error.message);

  // TODO tratamento de erros
  if (!data) throw new UserNotFoundError("Nenhum usuário encontrado")

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
