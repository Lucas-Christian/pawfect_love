import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function dogRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  let dogId = parseInt(req.params["dog_id"]!), dogName = req.body["name"]!, dogImage = req.body["image"]!;
  let data: { name?: string; image?: string; } = {};

  try {
    const existingDog = await db.findUnique("dog", {
      where: {
        dog_id: dogId
      }
    });
    
    if(!existingDog) {
      if(!dogName || !dogImage) return res.json({ status: 404, message: "Não foi possível criar esse cachorro no banco de dados." });
      data["name"] = dogName;
      data["image"] = dogImage;
    } else {
      if(dogImage && existingDog["image_url"] !== dogImage) data["image"] = dogImage;
      if(dogName && existingDog["name"] !== dogName) data["name"] = dogName;
      if(!data["name"] && !data["image"]) return res.json({ status: 409, message: "Os dados para serem atualizados já são exatamente iguais aos do cachorro." });
    }

    await db.upsert("dog", {
      where: {
        dog_id: dogId
      },
      update: data,
      create: {
        image_url: data["image"]!,
        name: data["name"]!
      }
    });

    res.json({ status: 200, message: `Sucesso ao atualizar o cachorro no banco de dados.` });
  } catch(err) {
    console.log(err);
    return res.json({ status: 500, message: "Não foi possível atualizar o cachorro no banco de dados", error: err });
  }
}