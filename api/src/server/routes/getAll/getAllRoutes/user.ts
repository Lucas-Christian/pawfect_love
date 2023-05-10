import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function userRoute(_req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  try {
    let user = await db.findMany("user");
    if(user === null || !user) return res.json({ status: 404, message: "Não existem usuários no banco de dados." });
    res.json({ status: 200, body: user });
  } catch(err) {
    res.json({ status: 500, message: "Erro ao tentar buscar pelos usuários.", error: err });
  }
}