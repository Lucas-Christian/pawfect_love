import GoogleProvider from "next-auth/providers/google";
import NextAuth, { Session } from "next-auth";
import { sessionChecks } from "@/src/functions/server/sessionChecks";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string
    })
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      sessionChecks(session);
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