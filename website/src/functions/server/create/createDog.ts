import { APIQueue } from "../APIQueue";

export async function createDog(body: { name: string; image: string; }) {
  const apiQueue = new APIQueue();

  return await new Promise<{ status: number, body: any }>((resolve) => {
    apiQueue.enqueue({
      url: "/dog",
      method: "POST",
      reqBody: body,
      callback: (response) => resolve(response)
    });
  });
}