import { AddressNotFoundError } from "errors/address-not-found.error";
import { supabase, supabaseAdmin } from "server";
import { CreateAddressReqDto } from "./dtos/create-address-req.dto";
import { Address } from "./adress.model";
import { AddressCreatingError } from "errors/address-creating.error";
import type { UpdateAddressReqDto } from "./dtos/update-address-req.dto";

export const GetAddresses = async (): Promise<Address[]> => {
  const { data, error } = await supabaseAdmin.from("addresses").select();

  if (error) throw new Error(error.message);

  if (!data) throw new AddressNotFoundError("No addresses found");

  return data;
};

export const GetAddressByUserId = async (user_id: number) => {
  const { data, error } = await supabaseAdmin
    .from("addresses")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return data;
};

export const CreateAddress = async (
  address: CreateAddressReqDto
): Promise<Address> => {
  const { data, error } = await supabaseAdmin
    .from("addresses")
    .insert({
      ...address,
    })
    .select()
    .single();

  if (error) throw new AddressCreatingError("Failed to create address");

  return data;
};

export const UpdateAddress = async (address: UpdateAddressReqDto) => {
  if (!address.user_id)
    throw new AddressNotFoundError("Address ID is required for update");

  const { user_id, ...updateData } = address;

  const { data, error } = await supabaseAdmin
    .from("addresses")
    .update(updateData)
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new AddressNotFoundError("Address not found");
    }
    console.log(error.code);
    throw new Error(`Failed to update address: ${error.message}`);
  }

  return data;
};

export const DeleteAddress = async (id: number) => {
  const { error } = await supabaseAdmin.from("addresses").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete address: ${error.message}`);

  console.debug(`Address ${id} deleted successfully`);
};
