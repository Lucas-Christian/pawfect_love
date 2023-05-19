import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Session } from "next-auth";
import { checkAdminStatus } from "@/src/functions/checkAdminStatus";
import { APIQueue } from "@/src/functions/APIQueue";

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
      checkAdminStatus(session, apiQueue);
      if(session.user!.email === process.env["ADMIN_EMAIL"]) session.isAdmin = true;
      return session;
    },
    secret: process.env["NEXTAUTH_SECRET"],
    pages: {
      signIn: "/auth/signin"
    }
  }
}

export default NextAuth(authOptions);