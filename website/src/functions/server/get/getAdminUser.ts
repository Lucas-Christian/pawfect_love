import type { Res } from "../../../types/APIQueueTypes";
import { createAdminUser } from "../create/createAdminUser";
import { APIQueue } from "../APIQueue";

export function getAdminUser(userId: string): Promise<Res<`/admin/${string}`>> {
  const apiQueue = new APIQueue();

  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: `/admin/${userId}`,
      method: "GET",
      callback: (res) => {
        if(res.status !== 200) {
          createAdminUser(userId)
            .then(() => getAdminUser(userId).then(resolve).catch(reject))
            .catch(reject);
        } else {
          resolve(res);
        }
      }
    });
  });
}