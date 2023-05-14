import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function dogRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let dogId = parseInt(req.params["dog_id"]!);
  try {
    const dog = await db.findUnique("dog", {
      where: {
        dog_id: dogId
      }
    });
    if(dog === null || !dog) return res.json({ status: 404, message: "Cachorro não encontrado." });

    await db.delete("dog", {
      where: {
        dog_id: dogId
      }
    });
    res.json({ status: 204, message: `Sucesso ao deletar o cachorro do banco de dados.` });
  } catch(err) {
    return res.json({ status: 500, message: "Não foi possível deletar o cachorro do banco de dados.", error: err });
  }
}