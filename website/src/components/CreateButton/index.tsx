import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Link from "next/link";

function MobileCreate() {
  const router = useRouter();

  return (
    <Link href="/post" className={styles["createMobile"]}>
      <PlusCircleIcon className="icon" style={{ stroke: router["pathname"] === "/create" ? "#6DC6DF" : "" }} />
    </Link> 
  );
}

function DesktopCreate() {
  return (
    <Link href="/post">
      <button className={styles["createDesktop"]}>
        <PlusCircleIcon className="icon" />
        <p style={{ color: "#FFFFFF" }}>Nova postagem</p>
      </button>
    </Link>
  );
}

export function Create({ type }: { type: "mobile" | "desktop" }): React.JSX.Element {
  const types = {
    "mobile": () => <MobileCreate />,
    "desktop": () => <DesktopCreate />
  }
  const CreateType = types[type];
  return <CreateType />;
}