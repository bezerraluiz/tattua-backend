
export const GetUserByUid = async (uid: string): Promise<User | null> => {
  console.log("🔍 GetUserByUid service called with uid:", uid);
  
  // Primeiro, vamos verificar se o usuário existe na tabela auth.users
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(uid);
  console.log("🔐 Auth user check:");
  console.log("  - Auth Data:", authUser?.user?.id);
  console.log("  - Auth Error:", authError);
  
  // Vamos tentar diferentes formas de consulta
  console.log("🔍 Trying different query methods...");
  
  // Método 1: Consulta simples
  const { data: data1, error: error1 } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("uid", uid);
  
  console.log("📊 Method 1 (select all):");
  console.log("  - Data:", data1);
  console.log("  - Error:", error1);
  console.log("  - Count:", data1?.length);
  
  if (data1 && data1.length > 0) {
    console.log("✅ Found user with method 1");
    return data1[0] as User;
  }
  
  // Método 2: Consulta com .single() (original)
  const { data: data2, error: error2 } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("uid", uid)
    .single();

  console.log("� Method 2 (single):");
  console.log("  - Data:", data2);
  console.log("  - Error:", error2);

  if (data2) {
    console.log("✅ Found user with method 2");
    return data2 as User;
  }
  
  // Método 3: Consulta por ID (como teste)
  const { data: data3, error: error3 } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", 21);
  
  console.log("📊 Method 3 (by id=21):");
  console.log("  - Data:", data3);
  console.log("  - Error:", error3);

  if (error2) {
    if (error2.code === "PGRST116") {
      console.log("⚠️  User not found in public.users table (PGRST116)");
      return null; // Not found
    }
    console.log("❌ Supabase error:", error2.message);
    throw new Error(error2.message);
  }
  
  console.log("❌ User not found with any method");
  return null;
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