import type { Res } from "../../../types/APIQueueTypes";
import { createUser } from "../create/createUser";
import { APIQueue } from "../APIQueue";

export function getUser(user: { name: string; email: string; }): Promise<Res<"/user">> {
  const apiQueue = new APIQueue();
  
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "GET",
      reqHeaders: { email: user.email },
      callback: (res) => {
        if(res.status !== 200) {
          createUser(user)
            .then(() => getUser(user).then(resolve).catch(reject))
            .catch(reject);
        } else {
          resolve(res);
        }
      }
    });
  });
}