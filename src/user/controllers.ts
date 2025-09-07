import { GetUserByUid } from "./services";
import { QueryGetUserUidSchema } from "./schemas/get-user-uid.schema";

export const GetUserByUidHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { user_uid } = QueryGetUserUidSchema.parse(req.query);

    if (!user_uid) {
      return reply.status(400).send({ error: true, message: "UID is required" });
    }
    
    const user = await GetUserByUid(user_uid);
    
    if (!user) {
      return reply.status(404).send({ error: true, message: "User not found" });
    }
    
    return reply.status(200).send({ error: false, data: user });
  } catch (error) {
    console.error("Error in GetUserByUidHandler:", error);
    return reply.status(500).send({ error: true, message: "Internal Server Error" });
  }
};
import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateUser,
  DeleteUser,
  GetUserByCpfcnpj,
  GetUsers,
  LoginUser,
  RefreshToken,
  RollbackUserCreation,
  UpdateUser,
} from "./services";
import { BodyCreateUserSchema } from "./schemas/create-user.schema";
import { UserNotFoundError } from "errors/user-not-found.error";
import { CreateAddress, DeleteAddress } from "address/services";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { AddressCreatingError } from "errors/address-creating.error";
import { PasswordStrong } from "utils/password-strong";
import type { CreateUserReqDto } from "./dto/create-user-req.dto";
import { UserUpdatingError } from "errors/user-updating.error";
import { QueryDeleteUserSchema } from "./schemas/delete-user.schema";
import { supabaseAdmin } from "server";
import {
  BodyUpdateUserSchema,
  QueryUpdateUserSchema,
} from "./schemas/update-user.schema";
import { UserDontExists } from "errors/user-dont-exists.error";
import { BodyLoginUserSchema } from "./schemas/login-user.schema";
import { BodyRefreshTokenSchema } from "./schemas/refresh-token.schema";

// Admin routes
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
  let user: any = {};
  let address: any = {};

  try {
    const body = BodyCreateUserSchema.parse(req.body);

    // Verify if password is strong
    if (!body.password || !PasswordStrong(body.password)) {
      return reply.status(400).send({
        error: true,
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    // Check if user already exists BEFORE creating anything
    await GetUserByCpfcnpj(body.tax_id.trim());

    // Creating user body
    const userBody: CreateUserReqDto = {
      studio_name: body.studio_name.trim(),
      email: body.email.trim(),
      tax_id: body.tax_id.trim(),
      telephone: body.telephone ? body.telephone.trim() : "",
      password: body.password.trim(),
    };

    // Insert user in database
    user = await CreateUser(userBody);

    console.debug("User created:", user);

    if (!user.user)
      throw reply
        .status(400)
        .send({ error: true, message: "User creation failed" });

    // Get the user from public.users table to get the ID
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("uid", user.user.id)
      .single();

    if (userError || !userData) {
      throw new Error("Failed to get user ID from database");
    }

    // Creating address body with user_id
    const addressBody = {
      user_id: userData.id,
      country: body.country.trim(),
      street: body.street.trim(),
      number: body.number.trim(),
      complement: body.complement ? body.complement.trim() : "",
      city: body.city.trim(),
      state: body.state.trim(),
      zip_code: body.zip_code.trim(),
    };

    // Insert address in database
    address = await CreateAddress(addressBody);

    if (!address) return;

    return reply.status(201).send({ error: false, data: user.user.id });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      console.error("User already exists:", error.message);
      throw reply.status(409).send({ error: true, message: error.message });
    } else if (error instanceof AddressCreatingError) {
      console.error("Address creation failed:", error.message);
      await RollbackUserCreation(user);
      throw reply.status(400).send({ error: true, message: error.message });
    } else if (error instanceof UserNotFoundError) {
      console.error("User not found:", error.message);
      throw reply.status(404).send({ error: true, message: error.message });
    } else if (error instanceof UserUpdatingError) {
      console.error("User update failed:", error.message);
      await RollbackUserCreation(user);
      throw reply.status(404).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      await RollbackUserCreation(user);
      throw reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};

export const UpdateUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { uid } = QueryUpdateUserSchema.parse(req.query);
    const body = BodyUpdateUserSchema.parse(req.body);

    const userUpdate = { uid, ...body };
    if (body.telephone) {
      userUpdate.telephone = body.telephone.trim();
    }

    const updatedUser = await UpdateUser(userUpdate);

    return reply.status(200).send({
      error: false,
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      console.error("User not found:", error.message);
      return reply.status(404).send({ error: true, message: error.message });
    } else if (error instanceof UserUpdatingError) {
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

export const DeleteUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { uid } = QueryDeleteUserSchema.parse(req.query);

    // Delete user
    await DeleteUser(uid);

    return reply
      .status(200)
      .send({ error: false, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error: ", error);
    throw reply
      .status(500)
      .send({ error: true, message: "Internal Server Error" });
  }
};

// Users routes
export const LoginUserHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = BodyLoginUserSchema.parse(req.body);

    const authData = await LoginUser(email, password);

    return reply
      .setCookie("access_token", authData.session?.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600, // 1 hour
      })
      .status(200)
      .send({
        error: false,
        data: {
          access_token: authData.session?.access_token,
          refresh_token: authData.session?.refresh_token,
        },
      });
  } catch (error) {
    if (error instanceof UserDontExists) {
      console.error("Login failed:", error.message);
      return reply.status(401).send({ error: true, message: error.message });
    } else {
      console.error("Error: ", error);
      return reply
        .status(500)
        .send({ error: true, message: "Internal Server Error" });
    }
  }
};

export const RefreshTokenHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { refresh_token } = BodyRefreshTokenSchema.parse(req.body);

    const authData = await RefreshToken(refresh_token);

    if (!authData.session?.access_token) {
      return reply.status(401).send({
        error: true,
        message: "Invalid refresh token",
      });
    }

    return reply
      .setCookie("access_token", authData.session?.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600, // 1 hour
      })
      .status(200)
      .send({
        error: false,
        data: {
          access_token: authData.session?.access_token,
          refresh_token: authData.session?.refresh_token,
        },
      });
  } catch (error) {
    console.error("Refresh token failed:", error);
    return reply.status(401).send({ 
      error: true, 
      message: "Invalid refresh token" 
    });
  }
};
