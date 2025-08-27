import { z } from "zod";

export const BodyLoginUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});
