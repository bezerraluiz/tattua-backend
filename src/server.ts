import fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const BASE_URL: string = process.env.BASE_URL as string;

const server = fastify();

server.register(cors, { origin: true }); // Enable CORS for all origins

// Route for testing
server.route({
  method: "GET",
  url: BASE_URL,
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          hello: "string",
        },
      },
    },
  },
  handler: function (request, reply) {
    reply.send({ hello: "world" });
  },
});

server.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.debug("Server is running on localhost:3333 🚀");
});
