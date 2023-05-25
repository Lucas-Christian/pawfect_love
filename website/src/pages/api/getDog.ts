import type { NextApiRequest, NextApiResponse } from "next";
import { getDog } from "@/src/functions/server/get/getDog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "GET") return res.json({ status: 405, message: "Método não permitido!" });

  const dogId = req.query["dogId"];

  try {
    const dog = await getDog(dogId as string);
    if(!dog) return res.json({ status: 404, message: "Cachorro não encontrado." });
    res.json({ status: 200, body: dog });
  } catch (error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao obter os dogs." });
  }
}
