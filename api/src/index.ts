import { Server } from "./server/server";

try {
  const server = new Server();
  server.start();
} catch(err) {
  console.log(err);
}