import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";

export default function Create() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if(status === "loading") {
    return (
      <Layout>
        <main>
          <div style={{ color: "white" }}>Loading...</div>
        </main>
      </Layout>
    );
  }

  if(status === "unauthenticated" || !session?.isAdmin) {
    router.push("/");
    return (
      <Layout>
        <main>
          <div style={{ color: "white" }}>Não autorizado</div>
        </main>
      </Layout>
    );
  }

  if(status === "authenticated" && session?.isAdmin) {
    return (
      <Layout>
        <main>
          <Post />
        </main>
      </Layout>
    );
  }

  return null;
}
