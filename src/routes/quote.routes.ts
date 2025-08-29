import { FastifyInstance } from "fastify";
import { CreateQuoteHandler } from "quotes/controllers";

export const QuoteRoutes = async (server: FastifyInstance) => {
  // Admin routes
  server.post("/", CreateQuoteHandler);
};
