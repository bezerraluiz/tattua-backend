import { FastifyInstance } from "fastify";
import { CreateQuoteHandler, GetQuotesByUserUidHandler } from "quotes/controllers";
import { authMiddleware } from "../middleware/auth.middleware";

export const QuoteRoutes = async (server: FastifyInstance) => {
  // Adicionar middleware de autenticação para todas as rotas de quote
  server.addHook('preHandler', authMiddleware);
  
  server.post("/", CreateQuoteHandler);
  server.get("/user", GetQuotesByUserUidHandler);
};
