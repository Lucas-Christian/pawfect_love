import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function adminRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userId = parseInt(req.params["user_id"]!);
  try {
    const admin = await db.findUnique("admin", {
      where: {
        user_id: userId
      }
    });
    if(admin === null || !admin) return res.json({ status: 404, message: "Admin não encontrado." });
    
    await db.delete("admin", {
      where: {
        user_id: userId
      }
    });
    res.json({ status: 204, message: `Sucesso ao deletar o admin do banco de dados.` });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível deletar o admin do banco de dados.", error: err });
  }
}