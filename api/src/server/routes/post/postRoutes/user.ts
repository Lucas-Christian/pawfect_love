import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function userRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userName = req.body["name"]!, userEmail = req.body["email"]!;
  if(!userName) return res.json({ status: 400, message: "Nome do usuário não fornecido." });
  if(!userEmail) return res.json({ status: 400, message: "Email do usuário não fornecido." });

  try {
    const existingUser = await db.findUnique("user", {
      where: {
        email: userEmail
      }
    });
    if(existingUser) return res.json({ status: 409, message: "O usuário já existe." });

    await db.create("user", {
      data: {
        name: userName,
        email: userEmail
      }
    });

    res.json({ status: 201, message: `Sucesso ao criar o ${userName} no banco de dados.` });
    
  } catch(err) {
    console.log(err);
    return res.json({ status: 500, message: "Não foi possível criar o usuário no banco de dados", error: err });
  }
}