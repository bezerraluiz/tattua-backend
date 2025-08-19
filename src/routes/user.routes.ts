import { FastifyInstance } from "fastify";
import { CreateUserHandler, DeleteUserHandler, GetUsersHandler } from "user/controllers";

export const UserRoutes = async (server: FastifyInstance) => {
  server.get("/api/v1/users", GetUsersHandler); // Admin route
  server.post("/api/v1/users", CreateUserHandler); // Admin route
  server.delete("/api/v1/users/delete", DeleteUserHandler); // Admin route
};
