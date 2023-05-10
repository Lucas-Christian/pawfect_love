import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function dogRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let dogName = req.body["name"]!, dogImage = req.body["image"]!;
  if(!dogName || !dogImage) return res.json({ status: 400, message: "Nome, ou imagem do cachorro não fornecido." });

  try {
    await db.create("dog", {
      data: {
        name: dogName,
        image_url: dogImage
      }
    });
    res.json({ status: 201, message: `Sucesso ao criar o ${dogName} no banco de dados.` });
  } catch(err) {
    console.log(err);
    return res.json({ status: 500, message: "Não foi possível inserir o cachorro no banco de dados.", error: err });
  }
}