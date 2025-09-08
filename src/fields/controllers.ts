import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserFixedFieldValues } from "./services";
import { BodyCreateUserCustomValuesSchema } from "./schemas/create-user-custom-values.schema";
import { supabaseAdmin } from "server";

export const CreateUserFixedFieldValuesHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    let bodyData = req.body;
    if (typeof bodyData === 'string') {
      try {
        bodyData = JSON.parse(bodyData);
      } catch (parseError) {
        return reply.status(400).send({
          error: true,
          message: "Formato JSON inválido"
        });
      }
    }

    const body = BodyCreateUserCustomValuesSchema.parse(bodyData);

    // Buscar o user_id baseado no user_uid
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("uid", body.user_uid)
      .single();

    if (userError || !userData) {
      return reply.status(404).send({
        error: true,
        message: "Usuário não encontrado"
      });
    }

    // Preparar dados para o service
    const fieldData = {
      user_id: userData.id,
      fixed_field_id: body.fixed_field_id,
      custom_name: body.custom_name,
      custom_value: body.custom_value,
      custom_options: body.custom_options ? Object.keys(body.custom_options) : undefined
    };

    const userFixedFieldValues = await CreateUserFixedFieldValues([fieldData]);

    return reply.status(201).send({
      error: false,
      data: userFixedFieldValues[0],
      message: "Valores de campos fixos criados com sucesso"
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return reply.status(400).send({
        error: true,
        message: "Dados de entrada inválidos",
        details: error.errors
      });
    }
    
    return reply.status(500).send({
      error: true,
      message: "Erro interno do servidor"
    });
  }
};