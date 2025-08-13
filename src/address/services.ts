import { AddressNotFoundError } from "errors/address-not-found.error";
import { supabase } from "server";
import { CreateAddressReqDto } from "./dtos/create-address-req.dto";
import { Address } from "./adress.model";
import { AddressCreatingError } from "errors/address-creating.error";

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
): Promise<Address> => {
  const { data, error } = await supabase.from("addresses").insert({
    ...address,
  }).select().single();

  if (error) throw new AddressCreatingError("Failed to create address");

  return data;
};
