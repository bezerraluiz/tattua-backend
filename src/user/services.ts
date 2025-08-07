import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";

export interface GetUsers {
  data: [];
  status: number;
  statusText: string;
}

export const GetUsers = async (): Promise<GetUsers | void> => {
  const { data, error } = await supabase.from("users").select();
};

export const CreateUser = async (
  user: CreateUserReqDto
): Promise<object | void> => {
  const { error } = await supabase.from("users").insert({
    studioName: user.studioName,
    cpfcnpj: user.cpfcnpj,
    password: user.password,
    addressId: user.addressId,
  });
};
