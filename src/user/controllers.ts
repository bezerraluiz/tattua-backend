import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, GetUserByCpfcnpj, GetUsers } from "./services";
import { BodyCreateUserSchema } from "./schemas/create-user.schema";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";
import { CreateAddress } from "address/services";
import { UserAlreadyExists } from "errors/user-already-exists.error";

export const GetUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const response = await GetUsers();

    if (!response)
      throw reply.status(404).send({
        error: true,
        message: "No users found",
      });

    return reply.status(200).send({ error: false, ...response });
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
		const existingUser = await GetUserByCpfcnpj(body.taxId);

		if (existingUser) 
			throw reply.status(400).send({ error: true, message: "User already exists" });
		
    // Creating addess body
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
      throw reply.status(500).send({ error: true, message: "Failed to create address" });

    // Pegar id do endereço
    const addressId = address.id;

    // Hash da password
    const passwordHash = "";

    const user: CreateUserReqDto = {
      studioName: body.studioName.trim(),
      email: body.email.trim(),
      taxId: body.taxId.trim(),
      password: body.password.trim(),
      addressId: addressId,
    };

    const response = await CreateUser(user);

		if (!response) throw reply.status(400).send({ error: true, message: "User creation failed" });
  
		return reply.status(201).send({ error: false, message: response });
	} catch (error) {	
    if (error instanceof UserAlreadyExists) {
      throw reply.status(404).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      throw reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};
