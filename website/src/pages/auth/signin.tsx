import { useEffect } from "react";

import { signIn } from "next-auth/react";

export default function SignIn() {
  useEffect(() => {
    signIn("google", { callbackUrl: process.env["NEXTAUTH_URL"] });
  }, []);
  return (
    <div />
  );
}