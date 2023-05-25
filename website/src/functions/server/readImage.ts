import { readFile } from "fs/promises";

export async function readImage(filePath: string) {
  return await new Promise<{ buffer: Buffer; mimeType: string; fileName: string; }>(async (resolve, reject) => {
    try {
      const file = await readFile(filePath);
      const fileExtension = filePath.split(".").pop()!.toLowerCase();
      const mimeType = `image/${fileExtension}`;
      const fileName = filePath.split("\\").pop()!;

      resolve({
        buffer: file,
        mimeType,
        fileName
      });
    } catch(error) {
      reject(error);
    }
  });
}