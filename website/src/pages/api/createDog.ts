import type { NextApiRequest, NextApiResponse } from "next";
import { APIQueue } from "@/src/functions/APIQueue";

const apiQueue = new APIQueue();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "POST") return res.json({ status: 405, message: "Método não permitido!" });

  try {
    await new Promise<{ status: number, body: any }>((resolve) => {
      apiQueue.enqueue({
        url: "/dog",
        method: "POST",
        reqBody: req.body,
        callback: (response) => resolve(response)
      });
    });
    return res.json({ status: 200, message: "Requisições concluídas com sucesso." });
  } catch(error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao criar o cachorro." });
  }
}