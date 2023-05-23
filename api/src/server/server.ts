import type { Application, Request, Response } from "express";
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
    Server.instance.use(express.urlencoded({ extended: true }));
    Server.instance.use(express.json());
    Server.instance.disable("x-powered-by");
  }
  private static routes(): void {
    routes.forEach(({ method, path, handler }) => {
      Server.instance[method](path, async (req: Request, res: Response) => {
        try {
          await handler(req, res, { db: Server.db });
        } catch(error) {
          console.error(error);
          res.json({ status: 500, message: "Erro interno do servidor." });
        }
      });
    });
  }

  public start(): void {
    console.log("> [api] Inicializando a API...");
    Server.instance.listen(process.env["PORT"] as string, () =>{
      console.log("> [api] A API foi incializada!");
    });
  }
}