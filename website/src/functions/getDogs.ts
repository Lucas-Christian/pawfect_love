import type { Dog } from "../types/APIQueueTypes";
import { APIQueue } from "./APIQueue";

export async function getDogs(): Promise<Dog[] | undefined> {
  const apiQueue = new APIQueue();

  return await new Promise((resolve) => {
    apiQueue.enqueue({
      url: "/dogs",
      method: "GET",
      callback: ({ status, body: dogArray }) => status === 200 ? resolve(dogArray) : resolve(undefined)
    });
  });
}