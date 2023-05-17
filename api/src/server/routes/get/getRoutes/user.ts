import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function userRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userId = parseInt(req.params["user_id"]!);
  let email = req.headers["email"]!;

  if(!userId && !email) return res.json({ status: 400, message: "Você não forneceu um email ou id de usuário válido para realizar a busca." });

  try {
    let where: { user_id?: number; } | { email?: string; };

    userId ? where = { user_id: userId } : where = { email: email as string };

    const user = await db.findUnique("user", { where: where });
    
    if(user === null || !user) return res.json({ status: 404, message: "Usuário não encontrado." });
    res.json({ status: 200, body: user });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível encontrar o usuário no banco de dados.", error: err });
  }
}