import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUser, GetUsers } from "./services";
import { BodyCreateUserSchema } from "./schemas/create-user.schema";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";

export const GetUsersHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const response = await GetUsers();

    if (!response) throw reply.status(404).send({
        error: true, message: "Nenhum usuário registrado"
    });

    return reply.status(200).send({error: false, ...response.data})
};

export const CreateUserHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const body  = BodyCreateUserSchema.parse(req.body);
    
    // Gerar uid do endereço
    const addressUid = "";

    // Criação do endereço

    // Gerar uid do user
    const userUid = "";

    // Hash da password
    const passwordHash = "";

    const user: CreateUserReqDto = {
        uid: userUid,
        studioName: body.studioName,
        cpfcnpj: body.cpfcnpj,
        password: body.password,
        valueCm: body.valueCm,
        valueNeedle: body.valueNeedle,
        addressUid: addressUid
    }

    const response = await CreateUser(user);
};