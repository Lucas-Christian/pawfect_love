export async function getDogImageInfos(dogId: string): Promise<{ status: number; body: { buffer: Buffer, mimeType: string, fileName: string } }> {
  const response = await fetch(`/api/getDogImageInfos?dogId=${dogId}`, {
    method: "GET",
    headers: {
      Authorization: process.env["AUTHORIZATION_KEY"]!
    },
  });
  return await response.json();
}