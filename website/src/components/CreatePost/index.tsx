import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Post } from "../Post";

export function CreatePost() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if(status === "loading") {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if(status === "unauthenticated" || session?.isAdmin === null || session?.isAdmin === undefined) {
    router.push("/");
    return <div style={{ color: "white" }}>Não autorizado</div>;
  }

  if(session?.isAdmin && status === "authenticated") {
    return <Post />;
  }

  return <div style={{ color: "white" }}>Loading...</div>;
}
