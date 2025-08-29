import { z } from "zod";

export const QueryDeleteUserSchema = z.object({
  uid: z.string().min(1, "ID do usuário é obrigatório"),
});
