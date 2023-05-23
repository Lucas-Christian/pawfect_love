import type { APIQueue } from "./APIQueue";
import type { Dog } from "../types/APIQueueTypes";

export async function getDogs(apiQueue: APIQueue): Promise<Dog[] | undefined> {
  return await new Promise((resolve) => {
    apiQueue.enqueue({
      url: "/dogs",
      method: "GET",
      callback: ({ status, body: dogArray }) => status === 200 ? resolve(dogArray) : resolve(undefined)
    });
  });
}