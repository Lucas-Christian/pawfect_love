import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function adminRoute(_req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  try {
    let admin = await db.findMany("admin");
    if(admin === null || !admin) return res.json({ status: 404, message: "Não existem admins no banco de dados." });
    res.json({ status: 200, body: admin });
  } catch(err) {
    res.json({ status: 500, message: "Erro ao tentar buscar pelos admins.", error: err });
  }
}