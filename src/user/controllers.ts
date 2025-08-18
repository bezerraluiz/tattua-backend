import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateUser,
  GetUserByCpfcnpj,
  GetUsers,
} from "./services";
import { BodyCreateUserSchema } from "./schemas/create-user.schema";
import { UserNotFoundError } from "errors/user-not-found.error";
import { CreateAddress } from "address/services";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { AddressCreatingError } from "errors/address-creating.error";
import { BodyCreateUserAuthSchema } from "./schemas/create-user-auth.schema";
import { PasswordStrong } from "utils/password-strong";
import type { CreateUserReqDto } from "./dtos/create-user-req.dto";

export const GetUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await GetUsers();

    return reply.status(200).send({ error: false, data: users });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw reply.status(404).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      throw reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};

export const CreateUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {    
    const body = BodyCreateUserSchema.parse(req.body);

    // Creating address body
    const addressBody = {
      country: body.country.trim(),
      street: body.street.trim(),
      number: body.number.trim(),
      complement: body.complement ? body.complement.trim() : "",
      city: body.city.trim(),
      state: body.state.trim(),
      zip_code: body.zip_code.trim(),
    };

    // Insert address in database
    const address = await CreateAddress(addressBody);

    if (!address) return;

    // Get id address
    const addressId = address.id;

    // Creating user body
    const userBody: CreateUserReqDto = {
      studio_name: body.studio_name.trim(),
      email: body.email.trim(),
      tax_id: body.tax_id.trim(),
      password: body.password.trim(),
      address_id: addressId,
    };

    // Verify if password is strong
    if (!body.password || !PasswordStrong(body.password)) {
      return reply.status(400).send({
        error: true,
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    // Inser user in database
    const user = await CreateUser(userBody);

    if (!user)
      throw reply
        .status(400)
        .send({ error: true, message: "User creation failed" });

    return reply.status(201).send({ error: false, data: user });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      throw reply.status(409).send({ error: true, message: error.message });
    } else if (error instanceof AddressCreatingError) {
      throw reply.status(400).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      throw reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};