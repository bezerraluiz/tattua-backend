import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { UserRoutes } from "routes/user-routes";

// Load environment variables from .env file
dotenv.config();

const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
const SUPABASE_KEY: string = process.env.SUPABASE_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
server.register(UserRoutes);

server.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.debug("Server is running on localhost:3333 🚀");
});
