import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Session } from "next-auth";
import { APIQueue, Res } from "@/src/functions/manipulateAPI";

const apiQueue = new APIQueue();

function getUser(session: Session): Promise<Res<"/user">> {
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

function createUser(session: Session) {
  return new Promise((resolve, reject) => {
    apiQueue.enqueue({
      url: "/user",
      method: "POST",
      reqBody: {
        name: session.user!.name!,
        email: session.user!.email!
      },
      callback: ({ status }) => {
        if(status !== 201) {
          reject(status);
        } else {
          resolve(201);
        }
      }
    });
  });
}


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string
    })
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      let { body: user } = await getUser(session);
      if(session!.user!.email === process.env["ADMIN_EMAIL"]) {
        console.log(user);
        apiQueue.enqueue({ url: `/admin/${user.user_id}`, method: "GET", callback: ({ status }) => {
          console.log(status);
          if(status !== 200) apiQueue.enqueue({ url: `/admin/${user.user_id}`, method: "POST" });
        }});
        session.isAdmin = true;
      }
      
      
      return session;
    },
    secret: process.env["NEXTAUTH_SECRET"],
    pages: {
      signIn: "/auth/signin"
    }
  }
}

export default NextAuth(authOptions);