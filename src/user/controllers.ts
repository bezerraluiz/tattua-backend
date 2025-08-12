import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, GetUserByCpfcnpj, GetUsers } from "./services";
import { BodyCreateUserSchema } from "./schemas/create-user.schema";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";
import { CreateAddress } from "address/services";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { hashPassword } from "utils/bcrypt";
import { AddressCreatingError } from "errors/address-creating.error";

export const GetUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await GetUsers();

    return reply.status(200).send({ error: false, ...users });
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

		// Verify if user already exists
		await GetUserByCpfcnpj(body.taxId);

    // Creating address body
    const addressBody = {
      country: body.country.trim(),
      street: body.street.trim(),
      number: body.number.trim(),
      complement: body.complement ? body.complement.trim() : "",
      city: body.city.trim(),
      state: body.state.trim(),
      zipCode: body.zipCode.trim(),
    };

    // Insert address in database
    const address = await CreateAddress(addressBody);

    if (!address)
      return;

    // Get id address
    const addressId = address.id;

    // Hashing password
    const passwordBody = body.password;
    const passwordHash = await hashPassword(passwordBody);

    // Creating user body
    const userBody: CreateUserReqDto = {
      studioName: body.studioName.trim(),
      email: body.email.trim(),
      taxId: body.taxId.trim(),
      password: passwordHash.trim(),
      addressId: addressId,
    };

    // Inser user in database
    const user = await CreateUser(userBody);

		if (!user) throw reply.status(400).send({ error: true, message: "User creation failed" });
  
		return reply.status(201).send({ error: false, message: user });
	} catch (error) {	
    if (error instanceof UserAlreadyExists) {
      throw reply.status(404).send({ error: true, message: error.message });
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
