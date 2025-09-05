import { UpdateAddressHandler } from "address/controllers";
import { FastifyInstance } from "fastify";

export const AddressRoutes = async (server: FastifyInstance) => {
  server.patch("/update", UpdateAddressHandler);
};