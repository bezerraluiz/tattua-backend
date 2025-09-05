import { FastifyInstance } from "fastify";
import { CreateUserFixedFieldValuesHandler } from "fields/controllers";

export const QuoteRoutes = async (server: FastifyInstance) => {
  server.post("/", CreateUserFixedFieldValuesHandler);
};
