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
  console.debug("Creating a new address with data:", address);

  const { data, error } = await supabase.from("addresses").insert({
    ...address,
  }).select().single();

  console.debug("Data:", data);
  console.debug("Error:", error);

  if (error) throw new AddressCreatingError("Failed to create address");

  return data;
};
