import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, GetUsers } from "./services";
import { BodyCreateUserSchema } from "./schemas/create-user.schema";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";
import { UserNotFoundError } from "errors/user-not-found.error";

export const GetUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const response = await GetUsers();

    if (!response)
      throw reply.status(404).send({
        error: true,
        message: "Nenhum usuário registrado",
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
  const body = BodyCreateUserSchema.parse(req.body);

  // Criação do endereço

  // Pegar id do endereço
  const addressId = 0;

  // Hash da password
  const passwordHash = "";

  const user: CreateUserReqDto = {
    studioName: body.studioName,
    taxId: body.taxId,
    password: body.password,
    addressId: addressId,
  };

  const response = await CreateUser(user);
};
