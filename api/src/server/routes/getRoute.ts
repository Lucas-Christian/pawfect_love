import { Request, Response } from "express";

export async function getRoute(req: Request, res: Response) {
  try {
    console.log(req.baseUrl);
    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}