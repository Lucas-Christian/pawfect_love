import { APIQueue } from "./APIQueue";

export async function getLike(userId: string, dogId: string): Promise<boolean | undefined> {
  const apiQueue = new APIQueue();
  
  return await new Promise<boolean | undefined>((resolve) => {
    apiQueue.enqueue({
      url: `/like/${userId}/${dogId}`,
      method: "GET",
      callback: ({ status }) => status === 200 ? resolve(true) : resolve(undefined)
    });
  });
}