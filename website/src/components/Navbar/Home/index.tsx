import { useRouter } from "next/router";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Home() {
  const router = useRouter();
  
  return (
    <Link href="/" title="Voltar para o início">
      <img src="/favicon.png" className="pawLogo" width="32" height="32" />
      <HomeIcon className="icon homeIcon" style={{ stroke: router["pathname"] === "/" ? "#6DC6DF" : undefined }} />
    </Link>
  );
}