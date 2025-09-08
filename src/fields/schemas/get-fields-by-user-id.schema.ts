import { z } from "zod";

export const QueryGetFieldsByUserIdSchema = z.object({
  user_id: z.string().regex(/^\d+$/, "user_id deve ser um número").transform(Number)
});

export type QueryGetFieldsByUserIdType = z.infer<typeof QueryGetFieldsByUserIdSchema>;
