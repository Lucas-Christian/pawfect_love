import type { Application } from "express";
import type { Route } from "./routes/routeFactory";
import { routes } from "./routes/routes";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

export class Server {
  private static instance: Application;

  constructor() {
    Server.instance = express();
    Server.config();
    Server.routes();
  }
  private static config(): void {
    Server.instance.use(helmet());
    Server.instance.use(express.json());
  }
  private static routes(): void {
    routes.forEach(({ method, path, handler}: Route) => {
      Server.instance[method](path, handler);
    });
  }
  public getInstance(): Application {
    if(!Server.instance) {
      Server.instance = new Server().getInstance();
    }
    return Server.instance;
  }
  public start(): void {
    console.log("> [api] Inicializando a API...");
    Server.instance.listen(process.env["PORT"] as string, () =>{
      console.log("> [api] A API foi incializada!");
    });
  }
}