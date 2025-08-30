import { supabaseAdmin } from "server";
import type { CreateQuoteReqDto } from "./dto/create-user-req.dto";

export const CreateQuote = async (quote: CreateQuoteReqDto) => {
  const { user_uid, ...fields } = quote;
  
  const { data, error } = await supabaseAdmin
    .from("budgets")
    .insert({ ...fields, user_uid: user_uid })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};
