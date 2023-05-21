import type { Like } from "../types/APIQueueTypes";
import { APIQueue } from "./APIQueue";

export function getLikes(dogId: number, apiQueue: APIQueue): Promise<Like[] | undefined> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: `/likes/${dogId}`,
      method: "GET",
      callback: ({ status, body: likes }) => {
        if(status === 200) resolve(likes);
        reject(undefined);
      }
    });
  });
}