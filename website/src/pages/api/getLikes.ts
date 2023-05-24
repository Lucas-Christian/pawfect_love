import type { NextApiRequest, NextApiResponse } from "next";
import { getLikes } from "@/src/functions/getLikes";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "GET") return res.json({ status: 405, message: "Método não permitido!" });

  try {
    const dogId = req.query["dog_id"] as string;

    const likes = await getLikes(dogId);
    if(!likes) return res.json({ status: 404, message: "Likes não encontrados." });
    res.json({ status: 200, body: likes });
  } catch (error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao obter os likes." });
  }
}
