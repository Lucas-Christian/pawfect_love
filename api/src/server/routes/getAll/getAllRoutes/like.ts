import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function likeRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let dogId = parseInt(req.params["dog_id"]!);
  let where = undefined;
  if(dogId && !isNaN(dogId)) where = { dog_id: dogId };
  
  try {
    let like = await db.findMany("like", {
      where: where
    });
    if(like === null || !like) return res.json({ status: 404, message: "Não existem likes no banco de dados." });
    res.json({ status: 200, body: like });
  } catch(err) {
    res.json({ status: 500, message: "Erro ao tentar buscar pelos likes.", error: err });
  }
}