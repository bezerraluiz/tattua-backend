import { supabaseAdmin } from "server";
import type { CreateQuoteReqDto } from "./dto/create-user-req.dto";
import { QuoteNotFoundError } from "errors/quote-not-found.error";

export const GetQuotesByUserUid = async (user_uid: string) => {
  const { data, error } = await supabaseAdmin
    .from("budgets")
    .select("*")
    .eq("user_uid", user_uid);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new QuoteNotFoundError("No quotes found for this user");
  }

  return data;
};


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