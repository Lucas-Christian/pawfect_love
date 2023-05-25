import { getDogImageInfos } from "./getDogImageInfos";

export async function getDogFile(dogId: string) {
  const { body: { buffer, mimeType, fileName } } = await getDogImageInfos(dogId);

  const blob = new Blob([buffer], { type: mimeType });
  const file = new File([blob], fileName, { type: mimeType });
  return file;
}