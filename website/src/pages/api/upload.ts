import type { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "fs";
import { mkdir, copyFile } from "fs/promises";
import { join } from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
    return res.json({ status: 401, message: "Não autorizado." });
  }
  if(req.method !== "POST") return res.json({ status: 405, message: "Método não permitido!" });

  try {
    const form = formidable({ multiples: true });
    const uploadDir = join(process.cwd(), "public", "dogs");

    await new Promise<void>((resolve, reject) => {
      form.parse(req, async (error, fields, files) => {
        if(error) {
          console.error(error);
          return reject({ status: 500, message: "Erro ao fazer upload do arquivo." });
        }

        const name = fields["name"]![0];
        const file = (files as any)["file"]![0] as formidable.File;

        if(!name || !file) return reject({ status: 400, message: "Nome e arquivo são campos obrigatórios." });
        
        const filePath = join(uploadDir, name as string);
        await mkdir(uploadDir, { recursive: true });

        const readStream = createReadStream(file.filepath);
        const writeStream = copyFile(file.filepath, filePath);

        writeStream
          .then(() => {
            resolve();
            res.json({ status: 200, message: filePath });
          })
          .catch((error) => {
            console.error(error);
            reject({ status: 500, message: "Erro ao fazer upload do arquivo." });
          });

        readStream.on("error", (error) => {
          console.error(error);
          reject({ status: 500, message: "Erro ao fazer upload do arquivo." });
        });
      });
    });

    res.end();
  } catch(error: any) {
    console.error(error);
    res.json({ status: 500, message: "Erro ao fazer upload do arquivo." });
  }
}