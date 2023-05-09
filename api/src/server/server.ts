import type { Application } from "express";
import type { Route } from "./routes/routeFactory";
import { Database } from "./database";
import { routes } from "./routes/routes";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

export class Server {
  private static instance: Application;
  private static db: Database;

  constructor() {
    Server.instance = express();
    Server.db = new Database();
    Server.config();
    Server.routes();
  }
  private static config(): void {
    Server.instance.use(helmet());
    Server.instance.use(cors());
    Server.instance.use(express.json());
    Server.instance.disable("x-powered-by");
  }
  private static routes(): void {
    routes.map(({ method, path, handler }: Route) => 
      Server.instance[method](path, (req, res) => handler(req, res, { db: Server.db }))
    );
  }
  public get instance(): Application {
    if(!Server.instance) Server.instance = new Server().instance;
    return Server.instance;
  }
  public start(): void {
    console.log("> [api] Inicializando a API...");
    Server.instance.listen(process.env["PORT"] as string, () =>{
      console.log("> [api] A API foi incializada!");
    });
  }
}