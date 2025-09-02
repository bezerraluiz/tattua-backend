import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserFixedFieldValues } from "./services";
import type { CreateUserFixedFieldValuesReqDto } from "./dto/create-user-fixed-field-values-req.dto";

export const CreateUserFixedFieldValuesHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body = req.body as CreateUserFixedFieldValuesReqDto[];

    if (!Array.isArray(body) || body.length === 0) {
      return reply.status(400).send({
        error: true,
        message: "Body deve ser um array não vazio de campos fixos"
      });
    }

    const userFixedFieldValues = await CreateUserFixedFieldValues(body);

    return reply.status(201).send({
      error: false,
      data: userFixedFieldValues,
      message: "Valores de campos fixos criados com sucesso"
    });
  } catch (error) {
    console.error("Error creating user fixed field values: ", error);
    return reply.status(500).send({
      error: true,
      message: "Erro interno do servidor"
    });
  }
};