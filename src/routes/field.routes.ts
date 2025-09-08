import { FastifyInstance } from "fastify";
import { CreateUserFixedFieldValuesHandler, GetFieldsByUserIdHandler } from "fields/controllers";
import { authMiddleware } from "../middleware/auth.middleware";

export const FieldRoutes = async (server: FastifyInstance) => {
  // Adicionar middleware de autenticação para todas as rotas de field
  server.addHook('preHandler', authMiddleware);
  
  server.post("/", CreateUserFixedFieldValuesHandler);
  server.get("/user", GetFieldsByUserIdHandler);
};
