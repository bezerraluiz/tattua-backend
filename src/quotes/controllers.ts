import { FastifyReply, FastifyRequest } from "fastify";
import { CreateQuote } from "./services";
import { CreateQuoteReqDto } from "./dto/create-user-req.dto";
import { CreateQuoteSchema } from "./schemas/create-quote.schema";

export const CreateQuoteHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body = CreateQuoteSchema.parse(req.body);

    const quote = await CreateQuote(body);
 
    return reply.status(201).send({ error: false, data: quote });
  } catch (error) {
    console.error("Error creating quote:", error);
    return reply.status(400).send({ error: true, message: (error as Error).message });
  }
};
