import { APIQueue } from "./APIQueue";
import { getUser } from "./getUser";
import { Session } from "next-auth";

export async function checkAdminStatus(session: Session, apiQueue: APIQueue): Promise<boolean> {
  return await getUser(session, apiQueue).then(({ body: user }) => {
    if(session!.user!.email !== process.env["ADMIN_EMAIL"]) return false;
    return new Promise<boolean>((resolve) => {
      apiQueue.enqueue({ url: `/admin/${user.user_id}`, method: "GET", 
        callback: ({ status }) => {
          if(status !== 200) {
            apiQueue.enqueue({ 
              url: `/admin/${user.user_id}`, 
              method: "POST",
              callback: ({ status }) => resolve(status === 201 || status === 409)
            });
          } else {
            resolve(true);
          }
        }
      });
    });
  })
  .then((isAdmin) => isAdmin)
  .catch((error) => {
    console.error("Ocorreu um erro:", error);
    return false;
  });
}