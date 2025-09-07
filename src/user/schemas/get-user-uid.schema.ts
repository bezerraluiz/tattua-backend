import { z } from "zod";

export const QueryGetUserUidSchema = z.object({
  user_uid: z.string().min(1, "UID é obrigatório"),
});
