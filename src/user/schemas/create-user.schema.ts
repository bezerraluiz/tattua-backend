import { z } from "zod";

export const BodyCreateUserSchema = z.object({
  studio_name: z.string().min(1, "Nome do estúdio é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  tax_id: z.string().min(1, "CPF/CNPJ é obrigatório"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  country: z.string().min(1, "País é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zip_code: z.string().min(1, "CEP é obrigatório"),
});
