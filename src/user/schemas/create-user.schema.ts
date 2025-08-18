import z from "zod";

export const BodyCreateUserSchema = z.object({
  studio_name: z.string(),
  email: z.email(),
  tax_id: z.string(),
  password: z.string(),
  country: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
});
