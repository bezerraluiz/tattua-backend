import { GetAddressByUserIdHandler, UpdateAddressHandler } from "address/controllers";
import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth.middleware";

export const AddressRoutes = async (server: FastifyInstance) => {
  // Adicionar middleware de autenticação para todas as rotas de endereço
  server.addHook('preHandler', authMiddleware);
  
  server.get("/user", GetAddressByUserIdHandler);
  server.patch("/update", UpdateAddressHandler);
};