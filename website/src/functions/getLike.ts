import type { APIQueue } from "./APIQueue";

export async function getLike(userId: number, dogId: number, apiQueue: APIQueue): Promise<boolean | undefined> {
  return await new Promise<boolean | undefined>((resolve) => {
    apiQueue.enqueue({
      url: `/like/${userId}/${dogId}`,
      method: "GET",
      callback: ({ status }) => status === 200 ? resolve(true) : resolve(undefined)
    });
  });
}