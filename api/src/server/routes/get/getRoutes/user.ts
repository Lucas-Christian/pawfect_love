import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function userRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userId = parseInt(req.params["user_id"]!);
  try {
    const user = await db.findUnique("user", {
      where: {
        user_id: userId
      }
    });
    if(user === null || !user) return res.json({ status: 404, message: "Usuário não encontrado." });
    res.json({ status: 200, body: user });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível encontrar o usuário no banco de dados.", error: err });
  }
}