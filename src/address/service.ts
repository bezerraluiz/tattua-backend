import { supabase } from "server";

interface GetAddresses {
  data: [];
  status: number;
  statusText: string;
}

export const GetAddresses = async (): Promise<any[] | void> => {
  const { data, error } = await supabase.from("adresses").select();

  // TODO tratamento de erros

  if (error) throw new Error(error.message);

  return data;
};
