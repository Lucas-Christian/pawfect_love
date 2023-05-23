import type { APIQueue } from "./APIQueue";
import type { Res } from "../types/APIQueueTypes";
import { createAdminUser } from "./createAdminUser";

export function getAdminUser(userId: number, apiQueue: APIQueue): Promise<Res<`/admin/${number}`>> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: `/admin/${userId}`,
      method: "GET",
      callback: (res) => {
        if(res.status !== 200) {
          createAdminUser(userId, apiQueue)
            .then(() => getAdminUser(userId, apiQueue).then(resolve).catch(reject))
            .catch(reject);
        } else {
          resolve(res);
        }
      }
    });
  });
}