import z from "zod";

export const QueryDeleteUserSchema = z.object({
  uid: z.string(),
});
