import z from "zod";

export const BodyRefreshTokenSchema = z.object({
  refresh_token: z.string(),
});