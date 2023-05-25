import type { NextApiRequest, NextApiResponse } from "next";
import { readImage } from "@/src/functions/server/readImage";
import { getDog } from "@/src/functions/server/get/getDog";
import { join } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "GET") return res.json({ status: 405, message: "Método não permitido!" });

  
  try {
    const dogId = req.query["dogId"];

    const dog = await getDog(dogId as string);
    if(!dog) return res.json({ status: 404, message: "Cachorro não encontrado." });

    const filePath = join(process.cwd(), "public", dog!.image_url);
    const image = await readImage(filePath);
    res.json({ status: 200, body: image });
  } catch (error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao obter os dogs." });
  }
}
