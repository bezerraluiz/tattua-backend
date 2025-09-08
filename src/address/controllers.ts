import type { FastifyReply } from "fastify";
import { GetAddresses, GetAddressByUserId, UpdateAddress } from "./services";
import { AddressNotFoundError } from "errors/address-not-found.error";
import { AddressUpdatingError } from "errors/address-updating.error";
import { BodyUpdateAddressSchema, QueryUpdateAddressSchema } from "./schemas/update-address.schema";
import { QueryGetAddressByUserIdSchema } from "./schemas/get-address-by-user-id.schema";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const GetAddressByUserIdHandler = async (
  req: AuthenticatedRequest,
  reply: FastifyReply
) => {
  try {
    const { user_id } = QueryGetAddressByUserIdSchema.parse(req.query);
    
    const addresses = await GetAddressByUserId(user_id);
    
    return reply.status(200).send({ 
      error: false, 
      data: addresses 
    });
  } catch (error) {
    if (error instanceof AddressNotFoundError) {
      return reply.status(404).send({ error: true, message: error.message });
    } else {
      return reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};

export const UpdateAddressHandler = async (
  req: AuthenticatedRequest,
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
      return reply.status(404).send({ error: true, message: error.message });
    } else if (error instanceof AddressUpdatingError) {
      return reply.status(400).send({ error: true, message: error.message });
    } else {
      return reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};