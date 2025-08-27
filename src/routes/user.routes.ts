import { FastifyInstance } from "fastify";
import { CreateUserHandler, DeleteUserHandler, LoginUserHandler, RefreshTokenHandler, UpdateUserHandler } from "user/controllers";

export const UserRoutes = async (server: FastifyInstance) => {
  // Admin routes
  server.post("/", CreateUserHandler);
  server.delete("/delete", DeleteUserHandler);
  server.patch("/update", UpdateUserHandler);
  // User routes
  server.post("/login", LoginUserHandler);
  server.post("/refresh", RefreshTokenHandler);
};