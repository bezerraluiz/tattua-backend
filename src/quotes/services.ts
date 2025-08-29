import { supabaseAdmin } from "server";
import type { CreateQuoteReqDto } from "./dto/create-user-req.dto";

export const CreateQuote = async (quote: CreateQuoteReqDto) => {
  const { user_id, ...fields } = quote;
  
  const { data, error } = await supabaseAdmin
    .from("budgets")
    .insert({ ...fields, user_id: user_id })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
