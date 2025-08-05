import fastify from "fastify";

const server = fastify();

server.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.debug("Server is running on localhost:3333 🚀");
});
