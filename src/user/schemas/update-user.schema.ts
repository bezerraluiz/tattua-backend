import { z } from "zod";

export const BodyUpdateUserSchema = z.object({
  studio_name: z.string().min(1, "Nome do estúdio é obrigatório").optional(),
  email: z.string().email("E-mail inválido").optional(),
  telephone: z.string().min(8, "Telefone é obrigatório").optional(),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres").optional(),
});

export const QueryUpdateUserSchema = z.object({
  uid: z.string().min(1, "ID do usuário é obrigatório"),
});
