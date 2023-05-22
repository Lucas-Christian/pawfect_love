import { NextApiRequest, NextApiResponse } from "next";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== "POST") {
    res.json({ status: 405, message: "Método não permitido!" });
    return;
  }

  const file = req.body;
  const fileName = req.headers["content-disposition"]?.split("filename=")[1]?.replace(/"/g, "");

  if(!file) {
    return res.json({ status: 400, message: "Nenhum arquivo enviado." });
  }
  if(!fileName) {
    return res.json({ status: 400, message: "Nenhum nome de arquivo foi fornecido." });
  }

  const uploadDir = join(process.cwd(), "public", "dogs");
  const filePath = join(uploadDir, fileName);

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, file);

    res.json({ status: 200, message: filePath });
  } catch (error) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao fazer upload do arquivo." });
  }
}