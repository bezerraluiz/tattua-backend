import z from "zod";

export const BodyCreateUserSchema = z.object({
  studioName: z.string(),
  email: z.email(),
  taxId: z.string(),
  password: z.string(),
  pricePerCm: z.string(),
  pricePerNeedle: z.string(),
  country: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});
