import { Server } from "./server/server";

try {
  let server = new Server();
  server.start();
} catch(err) {
  console.log(err);
}