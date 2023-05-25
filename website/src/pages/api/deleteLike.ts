import type { NextApiRequest, NextApiResponse } from "next";
import { APIQueue } from "@/src/functions/server/APIQueue";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if (req.method !== "DELETE") return res.json({ status: 405, message: "Método não permitido!" });
  let userId = req.query["userId"] as string;
  let dogId = req.query["dogId"] as string;

  const apiQueue = new APIQueue();

  try {
    const promiseRes = await new Promise<{ status: number; body: any }>((resolve) => {
      apiQueue.enqueue({
        url: `/like/${userId}/${dogId}`,
        method: "DELETE",
        callback: (response) => resolve(response)
      });
    });

    return res.json(promiseRes);
  } catch (error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao deletar o like." });
  }
}
