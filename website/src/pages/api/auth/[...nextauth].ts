import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Session } from "next-auth";
import { APIQueue } from "@/src/functions/manipulateAPI";

const apiQueue = new APIQueue();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string
    })
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      apiQueue.enqueue("/user", "GET", undefined, (response) => {
        let user = response.body.find(user => user.email === session.user?.email);
        if(!user) apiQueue.enqueue("/user", "POST", { name: session.user?.name!, email: session.user?.email! });
      });

      if(session!.user!.email === process.env["ADMIN_EMAIL"]) {
        apiQueue.enqueue("/user", "GET", undefined, (response) => {
          let user = response.body.find(user => user.email === session.user?.email);
          apiQueue.enqueue(`/admin/${user!.user_id}`, "GET", undefined, (adminRes) => {
            if(adminRes.status !== 200) apiQueue.enqueue(`/admin/${user!.user_id}`, "POST");
          });
        });

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