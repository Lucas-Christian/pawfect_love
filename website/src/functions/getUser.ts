import type { APIQueue } from "./APIQueue";
import type { Res } from "../types/APIQueueTypes";
import { createUser } from "./createUser";


export function getUser(user: { name: string; email: string; }, apiQueue: APIQueue): Promise<Res<"/user">> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "GET",
      reqHeaders: { email: user.email },
      callback: (res) => {
        if(res.status !== 200) {
          createUser(user, apiQueue)
            .then(() => getUser(user, apiQueue).then(resolve).catch(reject))
            .catch(reject);
        } else {
          resolve(res);
        }
      }
    });
  });
}