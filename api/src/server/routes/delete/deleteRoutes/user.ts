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

    await db.delete("user", {
      where: {
        user_id: userId
      }
    });
    res.json({ status: 204, message: `Sucesso ao deletar o usuário do banco de dados.` });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível deletar o usuário do banco de dados.", error: err });
  }
}