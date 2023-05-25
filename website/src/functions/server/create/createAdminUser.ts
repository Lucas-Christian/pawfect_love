import { APIQueue } from "../APIQueue";

export function createAdminUser(userId: string): Promise<number> {
  const apiQueue = new APIQueue();

  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: `/admin/${userId}`,
      method: "POST",
      callback: ({ status }) => {
        if(status === 201 || status === 409) {
          resolve(status);
        } else {
          reject(status);
        }
      },
    });
  });
}