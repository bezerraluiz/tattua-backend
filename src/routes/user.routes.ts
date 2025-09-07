import { FastifyInstance } from "fastify";
import { CreateUserHandler, DeleteUserHandler, GetUsersHandler, LoginUserHandler, RefreshTokenHandler, UpdateUserHandler, GetUserByUidHandler } from "user/controllers";

export const UserRoutes = async (server: FastifyInstance) => {
  server.get("/user", GetUserByUidHandler);
  server.get("/", GetUsersHandler);
  server.post("/", CreateUserHandler);
  server.delete("/delete", DeleteUserHandler);
  server.patch("/update", UpdateUserHandler);
  server.post("/register", CreateUserHandler);
  server.post("/login", LoginUserHandler);
  server.post("/refresh", RefreshTokenHandler);
};