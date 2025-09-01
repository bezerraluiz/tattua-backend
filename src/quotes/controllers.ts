import { FastifyReply, FastifyRequest } from "fastify";
import { CreateQuote, GetQuotesByUserUid } from "./services";
import { CreateQuoteSchema } from "./schemas/create-quote.schema";
import { QuoteNotFoundError } from "errors/quote-not-found.error";
import { GetQuotesByUserUidSchema } from "./schemas/get-quotes-user-uid.schema";

export const GetQuotesByUserUidHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { user_uid } = GetQuotesByUserUidSchema.parse(req.query);
    
    const quotes = await GetQuotesByUserUid(user_uid);

    return reply.status(200).send({ error: false, data: quotes });
  } catch (error) {
    console.error("Error get quotes by user uid:", error);
    if (error instanceof QuoteNotFoundError) {
      return reply.status(404).send({ error: true, message: error.message });
    }
    return reply.status(500).send({ error: true, message: "Internal Server Error" });
  }
};

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
