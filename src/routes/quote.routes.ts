import { FastifyInstance } from "fastify";
import { CreateQuoteHandler, GetQuotesByUserUidHandler } from "quotes/controllers";

export const QuoteRoutes = async (server: FastifyInstance) => {
  server.post("/", CreateQuoteHandler);
  server.get("/user", GetQuotesByUserUidHandler);
};
