import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { UserRoutes } from "routes/user.routes";
import { AddressRoutes } from "routes/address.routes";

// Load environment variables from .env file
dotenv.config();

export const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
export const SUPABASE_ANON_KEY: string = process.env.SUPABASE_ANON_KEY as string;
export const SUPABASE_SERVICE_ROLE_KEY: string = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Service client (bypassa RLS) - admin operations
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Normal client (with RLS) - users operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const server = fastify();

server.register(cors, { origin: true }); // Enable CORS for all origins

// Route for testing
server.route({
  method: "GET",
  url: "/",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },
  handler: function (req, reply) {
    reply.send({ hello: "world" });
  },
});

// Routes
server.register(UserRoutes, { prefix: "/api/v1/users" });
server.register(AddressRoutes, { prefix: "/api/v1/addresses" });

server.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.debug("Server is running on localhost:3333 🚀");
});
