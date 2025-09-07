import { GetAddressByUserIdHandler, UpdateAddressHandler } from "address/controllers";
import { FastifyInstance } from "fastify";

export const AddressRoutes = async (server: FastifyInstance) => {
  server.get("/user", GetAddressByUserIdHandler);
  server.patch("/update", UpdateAddressHandler);
};