import { useSession } from "next-auth/react";
import { Layout } from "../components/Layout";

export default function Create() {
  const { data: session, status } = useSession();

  if(session!.isAdmin !== true && status !== "authenticated") return <div>Não autorizado</div>;
  if(status === "authenticated" && session.isAdmin) {
    return (
      <Layout>
        <div>Autorizado</div>
      </Layout>
    );
  }
  return <div>Loading</div>;
}