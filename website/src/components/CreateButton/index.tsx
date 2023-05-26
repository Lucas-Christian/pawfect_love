import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Link from "next/link";

export function MobileCreate() {
  const router = useRouter();
  
  return (
    <Link href="/post" title="Postar novo doguinho" className={styles["createMobile"]}>
      <PlusCircleIcon className="icon" style={{ stroke: router["pathname"] === "/create" ? "#6DC6DF" : "" }} />
    </Link> 
  );
} 

export function DesktopCreate() {
  return (
    <Link title="Postar novo doguinho" href="/post">
      <button className={styles["createDesktop"]}>
        <PlusCircleIcon className="icon" />
        <p style={{ color: "#FFFFFF" }}>Nova postagem</p>
      </button>
    </Link>
  );
}