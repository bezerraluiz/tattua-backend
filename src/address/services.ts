import { AddressNotFoundError } from "errors/address-not-found.error";
import { supabase } from "server";
import { CreateAddressReqDto } from "./dtos/create-address-req.dto";
import { Address } from "./adress.model";

interface GetAddresses {
  data: [];
  status: number;
  statusText: string;
}

export const GetAddresses = async (): Promise<Address[]> => {
  const { data, error } = await supabase.from("adresses").select();

  if (error) throw new Error(error.message);

  if (!data) throw new AddressNotFoundError("No addresses found");

  return data;
};

export const CreateAddress = async (
  address: CreateAddressReqDto
): Promise<Address | null> => {
  const { data, error } = await supabase.from("adresses").insert({
    ...address,
  });

  // TODO tratamento de erro

  if (error) throw new Error(error.message);

  return data;
};
