import type { Like } from "../../../types/APIQueueTypes";
import { APIQueue } from "../APIQueue";

export async function getLikes(dogId: string): Promise<Like[] | undefined> {
  const apiQueue = new APIQueue();

  return await new Promise<Like[] | undefined>((resolve) => {
    apiQueue.enqueue({
      url: `/likes/${dogId}`,
      method: "GET",
      callback: ({ status, body: likes }) => status === 200 ? resolve(likes) : resolve(undefined)
    });
  });
}