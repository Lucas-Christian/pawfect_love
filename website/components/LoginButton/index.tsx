import { useSession, signIn, signOut } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Logado como {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Não está logado <br />
      <button onClick={() => signIn("google", { callbackUrl: process.env["NEXTAUTH_URL"] })}>Sign in</button>
    </>
  );
}