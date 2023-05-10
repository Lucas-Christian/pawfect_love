import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function dogRoute(_req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  try {
    let dog = await db.findMany("dog");
    if(dog === null || !dog) return res.json({ status: 404, message: "Não existem cachorros no banco de dados." });
    res.json({ status: 200, body: dog });
  } catch(err) {
    res.json({ status: 500, message: "Erro ao tentar buscar pelos cachorros.", error: err });
  }
}