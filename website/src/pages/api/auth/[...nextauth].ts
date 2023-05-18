import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Session } from "next-auth";
import { checkAdminStatus } from "@/src/functions/checkAdminStatus";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string
    })
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      checkAdminStatus(session);
      if(session.user!.email === process.env["ADMIN_EMAIL"]) session.isAdmin = true;
      return Promise.resolve(session);
    },
    secret: process.env["NEXTAUTH_SECRET"],
    pages: {
      signIn: "/auth/signin"
    }
  }
}

export default NextAuth(authOptions);