import { FastifyInstance } from "fastify";
import { GetUsers } from "user/services";

export const UserRoutes = async (server: FastifyInstance) => {
  server.get("/api/v1/users", GetUsers);
};
