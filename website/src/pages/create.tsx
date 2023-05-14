import { useSession } from "next-auth/react";

export default function Create() {
  const { data: session, status } = useSession();

  if(status === "authenticated" && session?.user?.email === "lucas.christian.programmer@gmail.com") {
    return (
      <div>Autorizado</div>
    );
  }
  return (
    <div>Não autorizado</div>
  );
}