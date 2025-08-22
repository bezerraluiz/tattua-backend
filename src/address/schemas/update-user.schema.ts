import z from "zod";

export const BodyUpdateAddressSchema = z.object({
  country: z.string().optional(),
  street: z.email().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
});

export const QueryUpdateAddressSchema = z.object({
  user_id: z.number(),
});