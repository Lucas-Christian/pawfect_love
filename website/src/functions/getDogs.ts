import type { APIQueue } from "./APIQueue";
import type { Dog } from "../types/APIQueueTypes";

export function getDogs(apiQueue: APIQueue): Promise<Dog[]> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/dogs",
      method: "GET",
      callback: ({ status, body: dogArray}) => {
        if(status === 200) resolve(dogArray);
        reject(undefined);
      }
    });
  });
}