import z from "zod";

export const BodyCreateUserAuthSchema = z.object({
  studioName: z.string(),
  email: z.email(),
  taxId: z.string(),
  password: z.string(),
});
