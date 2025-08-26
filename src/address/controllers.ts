import type { FastifyReply, FastifyRequest } from "fastify";
import { GetAddresses, UpdateAddress } from "./services";
import { AddressNotFoundError } from "errors/address-not-found.error";
import { AddressUpdatingError } from "errors/address-updating.error";
import { BodyUpdateAddressSchema, QueryUpdateAddressSchema } from "./schemas/update-user.schema";

export const GetAddressesHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await GetAddresses();

    return reply.status(200).send({ error: false, data: users });
  } catch (error) {
    if (error instanceof AddressNotFoundError) {
      throw reply.status(404).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      throw reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};

export const UpdateAddressHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { user_id } = QueryUpdateAddressSchema.parse(req.query);
    const body = BodyUpdateAddressSchema.parse(req.body);

    const addressUpdate = { user_id, ...body };

    const updatedAddress = await UpdateAddress(addressUpdate);

    return reply.status(200).send({ 
      error: false, 
      data: updatedAddress 
    });
  } catch (error) {
    if (error instanceof AddressNotFoundError) {
      console.error("User not found:", error.message);
      return reply.status(404).send({ error: true, message: error.message });
    } else if (error instanceof AddressUpdatingError) {
      console.error("User update failed:", error.message);
      return reply.status(400).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      return reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};