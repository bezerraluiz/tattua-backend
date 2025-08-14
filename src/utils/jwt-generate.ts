import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

interface JwtPayload {
    taxId: string;
    email: string;
}

export const generateJwtToken = async (
    payload: JwtPayload,
    expiresIn: number | undefined = 1800
): Promise<string> => {
  if (!expiresIn) throw new Error("Expiration time is required.");

  const signOptions: SignOptions = { expiresIn };

  return jwt.sign(payload, JWT_SECRET, signOptions);
};