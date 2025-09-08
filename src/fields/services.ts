import { supabaseAdmin } from "server";
import type { CreateUserFixedFieldValuesReqDto } from "./dto/create-user-fixed-field-values-req.dto";
import type { GetFieldsByUserIdReqDto } from "./dto/get-fields-by-user-id-req.dto";
import type { UserFixedFieldValues } from "./fields.model";

export const CreateUserFixedFieldValues = async (fields: CreateUserFixedFieldValuesReqDto[]): Promise<UserFixedFieldValues[]> => {
  const { data, error } = await supabaseAdmin
    .from("user_fixed_field_values")
    .insert(fields)
    .select();

  if (error) {
    throw new Error(`Erro ao criar valores de campos fixos: ${error.message}`);
  }

  return data;
};

export const GetFieldsByUserId = async (userId: number): Promise<UserFixedFieldValues[]> => {
  const { data, error } = await supabaseAdmin
    .from("user_fixed_field_values")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Erro ao buscar campos do usuário: ${error.message}`);
  }

  return data || [];
};