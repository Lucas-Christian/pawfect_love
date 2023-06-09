import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/src/functions/server/get/getUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if (req.method !== "GET") return res.json({ status: 405, message: "Método não permitido!" });

  try {
    const userEmail = req.headers["email"] as string;
    const userName = req.headers["name"] as string;

    const response = await getUser({ name: userName, email: userEmail });
    res.json(response);
  } catch (error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao obter usuário." });
  }
}
