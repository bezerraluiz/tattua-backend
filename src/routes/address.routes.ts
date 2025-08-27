import { UpdateAddressHandler } from "address/controllers";
import { FastifyInstance } from "fastify";

export const AddressRoutes = async (server: FastifyInstance) => {
  // Admin routes
  server.patch("/update", UpdateAddressHandler);
};