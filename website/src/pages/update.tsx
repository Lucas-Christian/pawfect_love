import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { Edit } from "../components/Edit";

export default function Update() {
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
      return <Edit />
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
