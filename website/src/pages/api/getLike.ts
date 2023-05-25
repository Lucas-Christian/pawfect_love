import type { NextApiRequest, NextApiResponse } from "next";
import { getLike } from "@/src/functions/server/get/getLike";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "GET") return res.json({ status: 405, message: "Método não permitido!" });
  
  try {
    const userId = req.query["user_id"] as string;
    const dogId = req.query["dog_id"] as string;
    
    const like = await getLike(userId, dogId);
    if(!like) return res.json({ status: 404, message: "Like não encontrado." });
    res.json({ status: 200, message: "Like encontrado." });
  } catch (error) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao obter o like." });
  }
}
