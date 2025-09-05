import { FastifyInstance } from "fastify";
import { CreateUserFixedFieldValuesHandler } from "fields/controllers";

export const FieldRoutes = async (server: FastifyInstance) => {
  server.post("/", CreateUserFixedFieldValuesHandler);
};
