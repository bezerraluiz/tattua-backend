import { UpdateAddressHandler } from "address/controllers";
import { FastifyInstance } from "fastify";

export const AddressRoutes = async (server: FastifyInstance) => {
  server.patch("/api/v1/addresses/update", UpdateAddressHandler); // Admin route
};