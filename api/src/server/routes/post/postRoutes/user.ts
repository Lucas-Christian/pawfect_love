import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function userRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userName = req.body["name"]!, userEmail = req.body["email"]!;
  
  if(!userName || !userEmail) return res.json({ status: 400, message: "O nome ou o e-mail do usuário não foi fornecido." });
  try {
    const existingUser = await db.findUnique("user", {
      where: {
        email: userEmail
      }
    });
    if(existingUser) return res.json({ status: 409, message: "Um usuário já está utilizando esse e-mail." });

    await db.create("user", {
      data: {
        name: userName,
        email: userEmail
      }
    });

    res.json({ status: 201, message: `Sucesso ao criar o ${userName} no banco de dados.` });
    
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível criar o usuário no banco de dados.", error: err });
  }
}