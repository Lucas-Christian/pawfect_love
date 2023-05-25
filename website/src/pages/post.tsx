import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";

export default function Create() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const createStatus = {
    "loading": () => <div style={{ color: "white" }}>Loading...</div>,
    "unauthenticated": () => {
      router.push("/");
      return <div style={{ color: "white" }}>Não autorizado</div>
    },
    "authenticated": () => {
      if(!session?.isAdmin) {
        router.push("/");
        return <div style={{ color: "white" }}>Não autorizado</div>
      }
      return <Post />
    }
  }

  const MainContent = createStatus[status];

  return (
    <Layout>
      <main>
        <MainContent />
      </main>
    </Layout>
  );
}
