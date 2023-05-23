import type { Like } from "../types/APIQueueTypes";
import type { APIQueue } from "./APIQueue";

export async function getLikes(dogId: number, apiQueue: APIQueue): Promise<Like[] | undefined> {
  return await new Promise<Like[] | undefined>((resolve) => {
    apiQueue.enqueue({
      url: `/likes/${dogId}`,
      method: "GET",
      callback: ({ status, body: likes }) => status === 200 ? resolve(likes) : resolve(undefined)
    });
  });
}