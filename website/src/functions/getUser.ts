import type { APIQueue } from "./APIQueue";
import type { Session } from "next-auth";
import type { Res } from "../types/APIQueueTypes";
import { createUser } from "./createUser";


export function getUser(session: Session, apiQueue: APIQueue): Promise<Res<"/user">> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "GET",
      reqHeaders: { email: session.user!.email! },
      callback: (res) => {
        if(res.status !== 200) {
          createUser(session, apiQueue)
            .then(() => getUser(session, apiQueue).then(resolve).catch(reject))
            .catch(reject);
        } else {
          resolve(res);
        }
      }
    });
  });
}