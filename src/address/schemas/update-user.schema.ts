import { z } from "zod";

export const BodyUpdateAddressSchema = z.object({
  country: z.string().min(1, "País é obrigatório").optional(),
  street: z.string().min(1, "Rua é obrigatória").optional(),
  number: z.string().min(1, "Número é obrigatório").optional(),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória").optional(),
  state: z.string().min(1, "Estado é obrigatório").optional(),
  zip_code: z.string().min(1, "CEP é obrigatório").optional(),
});

export const QueryUpdateAddressSchema = z.object({
  user_id: z.number().int("ID do usuário deve ser um número inteiro"),
});