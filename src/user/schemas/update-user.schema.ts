import z from "zod";

export const BodyUpdateUserSchema = z.object({
  studio_name: z.string().optional(),
  email: z.email().optional(),
  password: z.string().optional(),
});

export const QueryUpdateUserSchema = z.object({
  uid: z.string(),
});
