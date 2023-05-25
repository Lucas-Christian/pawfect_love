import type { NextApiRequest, NextApiResponse } from "next";
import { getDogs } from "@/src/functions/getDogs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "GET") return res.json({ status: 405, message: "Método não permitido!" });

  try {
    const dogs = await getDogs();
    if(!dogs) return res.json({ status: 404, message: "Dogs não encontrados." });
    res.json({ status: 200, body: dogs });
  } catch (error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao obter os dogs." });
  }
}
