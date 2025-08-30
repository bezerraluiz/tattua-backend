import { z } from "zod";

export const GetQuotesByUserUidSchema = z.object({
  user_uid: z.string().min(1, "Usuário é obrigatório"),
});
