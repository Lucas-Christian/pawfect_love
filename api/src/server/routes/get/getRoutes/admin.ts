import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function adminRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userId = parseInt(req.params["user_id"]!);
  if(isNaN(userId)) return res.json({ status: 400, message: "ID de usuário inválido." });
  
  try {
    const user = await db.findUnique("admin", {
      where: {
        user_id: userId
      }
    });
    console.log(userId);
    console.log(user);
    if(user === null || !user) return res.json({ status: 404, message: "Admin não encontrado." });
    res.json({ status: 200, body: user });
  } catch(err) {
    console.error("Erro ao obter o admin do banco de dados:", err);

    return res.json({ status: 500, message: "Não foi possível encontrar o admin no banco de dados.", error: err });
  }
}