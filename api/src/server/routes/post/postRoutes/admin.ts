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
    if(admin) return res.json({ status: 409, message: "Admin já existe no banco de dados." });

    await db.create("admin", {
      data: {
        user_id: userId
      }
    });
    res.json({ status: 201, message: `Sucesso ao criar o administrador no banco de dados.` });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível criar o administrador no banco de dados.", error: err });
  }
}