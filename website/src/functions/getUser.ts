import { Res, apiQueue } from "./manipulateAPI";
import { createUser } from "./createUser";
import { Session } from "next-auth";


export function getUser(session: Session): Promise<Res<"/user">> {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "GET",
      reqHeaders: { email: session.user!.email! },
      callback: (res) => {
        if(res.status !== 200) {
          createUser(session)
            .then(() => getUser(session).then(resolve).catch(reject))
            .catch(reject);
        } else {
          resolve(res);
        }
      }
    });
  });
}