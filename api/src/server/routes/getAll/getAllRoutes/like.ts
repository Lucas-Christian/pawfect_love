import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function likeRoute(_req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  try {  
    let like = await db.findMany("like");
    if(like === null || !like) return res.json({ status: 404, message: "Não existem likes no banco de dados." });
    res.json({ status: 200, body: like });
  } catch(err) {
    res.json({ status: 500, message: "Erro ao tentar buscar pelos likes.", error: err });
  }
}