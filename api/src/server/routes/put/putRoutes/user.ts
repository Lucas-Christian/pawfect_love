import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function userRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userId = parseInt(req.params["user_id"]!), userName = req.body["name"]!, userEmail = req.body["email"]!;
  let data: { name?: string; email?: string; } = {};

  try {
    const existingUser = await db.findUnique("user", {
      where: {
        user_id: userId
      }
    });
    
    if(!existingUser) {
      if(!userName || !userEmail) return res.json({ status: 404, message: "Não foi possível criar esse usuário no banco de dados." });
      data["name"] = userName;
      data["email"] = userEmail;
    } else {
      if(userEmail && existingUser["email"] !== userEmail) data["email"] = userEmail;
      if(userName && existingUser["name"] !== userName) data["name"] = userName;
      if(!data["name"] && !data["email"]) return res.json({ status: 409, message: "Os dados para serem atualizados já são exatamente iguais aos do usuário." });
    }

    await db.upsert("user", {
      where: {
        user_id: userId
      },
      update: data,
      create: {
        email: data["email"]!,
        name: data["name"]!
      }
    });

    res.json({ status: 200, message: `Sucesso ao atualizar o usuário no banco de dados.` });
  } catch(err) {
    console.log(err);
    return res.json({ status: 500, message: "Não foi possível atualizar o usuário no banco de dados", error: err });
  }
}