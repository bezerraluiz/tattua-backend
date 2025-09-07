import { FastifyInstance } from "fastify";
import { CreateUserHandler, DeleteUserHandler, GetUsersHandler, LoginUserHandler, RefreshTokenHandler, UpdateUserHandler, GetUserByUidHandler } from "user/controllers";
import { authMiddleware } from "../middleware/auth.middleware";

export const UserRoutes = async (server: FastifyInstance) => {
  // Rotas públicas (sem autenticação)
  server.post("/register", CreateUserHandler);
  server.post("/login", LoginUserHandler);
  server.post("/refresh", RefreshTokenHandler);

  // Aplicar middleware de autenticação para rotas protegidas
  server.register(async function(protectedRoutes) {
    protectedRoutes.addHook('preHandler', authMiddleware);
    
    protectedRoutes.get("/", GetUserByUidHandler);
    protectedRoutes.get("/all", GetUsersHandler);
    protectedRoutes.post("/", CreateUserHandler);
    protectedRoutes.delete("/delete", DeleteUserHandler);
    protectedRoutes.patch("/update", UpdateUserHandler);
  });
};