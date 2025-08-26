import z from "zod";

export const QueryGetUserCpfcnpjSchema = z.object({
  tax_id: z.string(),
});
