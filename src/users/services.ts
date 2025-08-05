import { supabase } from "server";

export const GetUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
