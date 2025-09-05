import { z } from "zod";

export const BodyCreateUserCustomValuesSchema = z.object({
  user_uid: z.string().uuid("UID do usuário deve ser um UUID válido"),
  fixed_field_id: z.number("ID do campo fixo deve ser um número válido"),
  custom_name: z.string().min(1, "Nome customizado é obrigatório").optional(),
  custom_value: z.number("Valor customizado deve ser um número").optional(),
  custom_options: z
    .record(
      z.string("Nome da opção é obrigatório"),
      z.number("Valor da opção é obrigatório")
    )
    .optional(),
});
