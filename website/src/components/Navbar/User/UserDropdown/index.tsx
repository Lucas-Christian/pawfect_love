import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import styles from "./index.module.css";

export function UserDropdown() {
  return (
    <div className={styles["user_dropdown"]}>
      <div className={styles["user_dropdown_item"]} onClick={() => signOut()}>
        <ArrowLeftOnRectangleIcon className="icon" /><p>Logout</p>
      </div>
    </div>
  );
}