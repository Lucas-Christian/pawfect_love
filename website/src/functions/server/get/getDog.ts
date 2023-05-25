import type { Dog } from "../../../types/APIQueueTypes";
import { APIQueue } from "../APIQueue";

export async function getDog(dogId: string): Promise<Dog | undefined> {
  const apiQueue = new APIQueue();

  return await new Promise((resolve) => {
    apiQueue.enqueue({
      url: `/dog/${dogId}`,
      method: "GET",
      callback: ({ status, body: dog }) => status === 200 ? resolve(dog) : resolve(undefined)
    });
  });
}