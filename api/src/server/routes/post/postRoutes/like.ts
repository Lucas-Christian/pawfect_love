import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function likeRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let userId = parseInt(req.params["user_id"]!), dogId = parseInt(req.params["dog_id"]!);
  try {
    const existingUser = await db.findUnique("user", {
      where: {
        user_id: userId
      }
    });
    if(!existingUser) return res.json({ status: 404, message: "O usuário não existe." });

    const existingDog = await db.findUnique("dog", {
      where: {
        dog_id: dogId
      }
    })
    if(!existingDog) return res.json({ status: 404, message: "O cachorro não existe." });

    const existingLike = await db.findUnique("like", {
      where: {
        user_id_dog_id: {
          user_id: userId,
          dog_id: dogId
        }
      }
    });
    if(existingLike) return res.json({ status: 409, message: "O usuário já curtiu este cachorro." });
    
    await db.create("like", {
      data: {
        user_id: userId,
        dog_id: dogId
      }
    });

    res.json({ status: 201, message: "Sucesso ao criar novo like no banco de dados." });

  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível criar o like no banco de dados.", error: err });
  }
}