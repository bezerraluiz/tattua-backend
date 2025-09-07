
export const GetUserByUid = async (uid: string): Promise<User | null> => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("uid", uid)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw new Error(error.message);
  }
  return data as User;
};
import { supabaseAdmin } from "server";
import { UserNotFoundError } from "errors/user-not-found.error";
import { UserAlreadyExists } from "errors/user-already-exists.error";
import { User } from "./user.model";
import type { UpdateUserReqDto } from "./dto/update-user-req.dto";
import type { CreateUserReqDto } from "./dto/create-user-req.dto";
import { UserUpdatingError } from "errors/user-updating.error";
import { UserDontExists } from "errors/user-dont-exists.error";

export const GetUsers = async (): Promise<User[]> => {
  const { data, error } = await supabaseAdmin.from("users").select();

  if (error) throw new Error(error.message);

  if (data.length == 0) throw new UserNotFoundError("No users found");

  return data;
};

export const GetUserByCpfcnpj = async (tax_id: string) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("tax_id", tax_id);

  if (error) throw new Error(error.message);

  if (data.length != 0) throw new UserAlreadyExists("User already exists");

  return data;
};

export const GetUserByEmail = async (email: string) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) throw new Error(error.message);

  if (!data.length) throw new UserDontExists("Unregistered user");

  return data;
};

export const CreateUser = async (user: CreateUserReqDto) => {

  const { data, error } = await supabaseAdmin.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        studio_name: user.studio_name,
        tax_id: user.tax_id,
        telephone: user.telephone,
        emailRedirectTo: 'http://localhost:5173/login'
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const UpdateUser = async (user: UpdateUserReqDto) => {
  if (!user.uid)
    throw new UserNotFoundError("User ID is required for update");

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    user.uid,
    {
      email: user.email,
      password: user.password,
      user_metadata: {
        studio_name: user.studio_name,
        telephone: user.telephone,
      },
    }
  );

  if (error) {
    if (error.code == "user_not_found") {
      throw new UserNotFoundError("User not found");
    }
    throw new UserUpdatingError("Failed to update user");
  }

  return data.user;
};

export const DeleteUser = async (uid: string) => {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(uid);

  if (error) throw new Error(`Failed to delete user: ${error.message}`);

  console.debug(`User ${uid} deleted successfully`);
};

export const RollbackUserCreation = async (user?: any) => {
  // ROLLBACK: Delete everything that was created
  console.log("Error occurred, starting rollback...");

  // Delete user if it was created
  if (user?.user) {
    try {
      await DeleteUser(user.user.id);
      console.log("Rolled back user creation");
    } catch (rollbackError) {
      console.error("Failed to rollback user:", rollbackError);
    }
  }
};

export const LoginUser = async (email: string, password: string) => {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      throw new UserDontExists("Invalid email or password");
    }
    throw new Error(error.message);
  }

  return data;
};

export const RefreshToken = async (refreshToken: string) => {
  const { data, error } = await supabaseAdmin.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};