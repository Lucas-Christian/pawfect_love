import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function likeRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let dogId = parseInt(req.params["dog_id"]!), userId = parseInt(req.params["user_id"]!);

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

    await db.delete("like", {
      where: {
        user_id_dog_id: {
          user_id: userId,
          dog_id: dogId
        }
      }
    });
    res.json({ status: 204, message: `Sucesso ao deletar o like do banco de dados.` });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível deletar o like do banco de dados.", error: err });
  }
}