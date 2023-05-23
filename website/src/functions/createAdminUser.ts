import type { APIQueue } from "./APIQueue";

export function createAdminUser(userId: number, apiQueue: APIQueue): Promise<number> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: `/admin/${userId}`,
      method: "POST",
      callback: ({ status }) => {
        if(status !== 201 && status !== 409) {
          reject(status);
        } else {
          resolve(status);
        }
      },
    });
  });
}