import { AddressNotFoundError } from "errors/address-not-found.error";
import { supabaseAdmin } from "server";
import { CreateAddressReqDto } from "./dtos/create-address-req.dto";
import { Address } from "./adress.model";
import { AddressCreatingError } from "errors/address-creating.error";

interface GetAddresses {
  data: [];
  status: number;
  statusText: string;
}

export const GetAddresses = async (): Promise<Address[]> => {
  const { data, error } = await supabaseAdmin.from("adresses").select();

  if (error) throw new Error(error.message);

  if (!data) throw new AddressNotFoundError("No addresses found");

  return data;
};

export const CreateAddress = async (
  address: CreateAddressReqDto
): Promise<Address> => {
  const { data, error } = await supabaseAdmin.from("addresses").insert({
    ...address,
  }).select().single();

  if (error) throw new AddressCreatingError("Failed to create address");

  return data;
};

export const DeleteAddress = async (id: number) => {
  const { error } = await supabaseAdmin
    .from("addresses")
    .delete()
    .eq("id", id);
  
  if (error) 
    throw new Error(`Failed to delete address: ${error.message}`);
  
  console.debug(`Address ${id} deleted successfully`);
};

export const DeleteAddressByUserId = async (userId: number) => {
  const { error } = await supabaseAdmin
    .from("addresses")
    .delete()
    .eq("user_id", userId);
  
  if (error) 
    throw new Error(`Failed to delete address for user: ${error.message}`);
  
  console.debug(`Address for user ${userId} deleted successfully`);
};
