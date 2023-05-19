import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";

export default function Create() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if(status === "loading") return <Layout><main><div style={{color: "white"}}>Loading...</div></main></Layout>;

  console.log(session);

  if(status === "unauthenticated" || session!["isAdmin"] === null || session!["isAdmin"] === undefined) {
    router.push("/");
    return <Layout><main><div style={{color: "white"}}>Não autorizado</div></main></Layout>;
  }
  if(session!.isAdmin && status === "authenticated") {
    return (
      <Layout>
        <main>

          <Post />
        </main>
      </Layout>
    );
  }
  return <Layout><main><div style={{color: "white"}}>Loading...</div></main></Layout>;
}