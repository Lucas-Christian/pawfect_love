import { APIQueue } from "../APIQueue";

export function createUser(user: { name: string; email: string; }): Promise<number> {
  const apiQueue = new APIQueue();

  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "POST",
      reqBody: {
        name: user.name,
        email: user.email
      },
      callback: ({ status }) => {
        if(status === 201 || status === 409) {
          resolve(status);
        } else {
          reject(status);
        }
      }
    });
  });
}