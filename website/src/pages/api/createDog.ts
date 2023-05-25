import type { NextApiRequest, NextApiResponse } from "next";
import { createDog } from "@/src/functions/server/create/createDog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "POST") return res.json({ status: 405, message: "Método não permitido!" });
  
  try {
    const dogResponse = await createDog(req.body);
    res.json(dogResponse);
  } catch(error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao criar o cachorro." });
  }
}