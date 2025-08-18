import z from "zod";

export const BodyCreateUserAuthSchema = z.object({
  studio_name: z.string(),
  email: z.email(),
  tax_id: z.string(),
  password: z.string(),
});
