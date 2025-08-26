import { FastifyInstance } from "fastify";
import { CreateUserHandler, DeleteUserHandler, GetUserByCpfcnpjHandler, GetUsersHandler, UpdateUserHandler } from "user/controllers";

export const UserRoutes = async (server: FastifyInstance) => {
  server.get("/api/v1/users", GetUserByCpfcnpjHandler); // Admin route
  server.post("/api/v1/users", CreateUserHandler); // Admin route
  server.delete("/api/v1/users/delete", DeleteUserHandler); // Admin route
  server.patch("/api/v1/users/update", UpdateUserHandler); // Admin route
};