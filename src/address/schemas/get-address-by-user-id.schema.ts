import { z } from "zod";

export const QueryGetAddressByUserIdSchema = z.object({
  user_id: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val), {
    message: "ID do usuário deve ser um número válido",
  }),
});
