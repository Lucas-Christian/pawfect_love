import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function dogRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let dogId = parseInt(req.params["dog_id"]!);
  try {
    let dog = await db.findUnique("dog", {
      where: {
        dog_id: dogId
      }
    });
    if(dog === null || !dog) return res.json({ status: 404, message: "Cachorro não encontrado." });
    res.json({ status: 200, body: dog });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível encontrar o cachorro no banco de dados", error: err });
  }
}