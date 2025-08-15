import { FastifyInstance } from "fastify";
import { CreateUserAuthHandler, CreateUserHandler, GetUsersHandler } from "user/controllers";

export const UserRoutes = async (server: FastifyInstance) => {
  server.get("/api/v1/users", GetUsersHandler);
  server.post("/api/v1/users", CreateUserHandler);
  server.post("/api/v1/users/auth", CreateUserAuthHandler);
};
