import z from "zod";

export const BodyCreateUserSchema = z.object({
    studioName: z.string(),
    cpfcnpj: z.string(),
    password: z.string(),
    valueCm: z.string(),
    valueNeedle: z.string(),
    country: z.string(),    
    street: z.string(),    
    number: z.string(),
    complement: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
})