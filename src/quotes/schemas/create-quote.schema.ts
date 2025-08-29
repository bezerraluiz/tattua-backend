import { z } from "zod";

export const CreateQuoteSchema = z.object({
  client_name: z.string().min(1, "Nome do cliente é obrigatório"),
  professional_name: z.string().min(1, "Nome do profissional é obrigatório"),
  tattoo_size: z.string().min(1, "Tamanho da tatuagem é obrigatório"),
  difficulty: z.string().min(1, "Dificuldade é obrigatória"),
  body_region: z.string().min(1, "Região do corpo é obrigatória"),
  colors_quantity: z.string().min(1, "Quantidade de cores é obrigatória"),
  needle_fill: z.string().min(1, "Agulha/Preenchimento é obrigatório"),
  estimated_hours: z.number().min(0.1, "Horas estimadas é obrigatório"),
  description: z.string().optional(),
  total: z.number().min(0, "Total é obrigatório"),
  custom_fields: z.record(z.string(), z.any()).optional(),
  user_id: z.number().int().min(1, "Usuário é obrigatório"),
});
