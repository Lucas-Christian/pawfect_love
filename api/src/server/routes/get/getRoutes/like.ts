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

    const like = await db.findUnique("like", {
      where: {
        user_id_dog_id: {
          user_id: userId,
          dog_id: dogId
        }
      }
    });
    if(like === null || !like) return res.json({ status: 404, message: "Like não encontrado." });
    
    res.json({ status: 200, body: like });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível encontrar o like no banco de dados.", error: err });
  }
}