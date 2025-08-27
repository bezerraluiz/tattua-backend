import { FastifyInstance } from "fastify";
import { CreateUserHandler, DeleteUserHandler, GetUsersHandler, LoginUserHandler, RefreshTokenHandler, UpdateUserHandler } from "user/controllers";

export const UserRoutes = async (server: FastifyInstance) => {
  // Admin routes
  server.get("/", GetUsersHandler);
  server.post("/", CreateUserHandler);
  server.delete("/delete", DeleteUserHandler);
  server.patch("/update", UpdateUserHandler);
  // User routes
  server.post("/register", CreateUserHandler);
  server.post("/login", LoginUserHandler);
  server.post("/refresh", RefreshTokenHandler);
};