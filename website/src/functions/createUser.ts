import { APIQueue } from "./APIQueue";
import { Session } from "next-auth";

export function createUser(session: Session, apiQueue: APIQueue) {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "POST",
      reqBody: {
        name: session.user!.name!,
        email: session.user!.email!
      },
      callback: ({ status }) => {
        if(status !== 201 && status !== 409) {
          reject(status);
        } else {
          resolve(201);
        }
      }
    });
  });
}