import type { Dependencies } from "../../types/Dependencies";
import { Request, Response } from "express";

export async function getAllRoute(req: Request, res: Response, { db }: Dependencies) {
  try {
    console.log(req.url);
    console.log(req.originalUrl);
    console.log(db);

    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}