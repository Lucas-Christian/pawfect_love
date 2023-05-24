import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import styles from "./index.module.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Options({ dogId }: { dogId: string; }) {
  const { status, data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  async function deleteDogAPI() {
    await fetch(`/api/deleteDog?dogId=${dogId}`, {
      headers: {
        Authorization: process.env["AUTHORIZATION_KEY"]!
      },
      method: "DELETE"
    });
  }

  if (status === "authenticated" && session!.isAdmin) {
    return (
      <div className={styles["dropdownContainer"]}>
        <EllipsisVerticalIcon
          onClick={handleDropdownClick}
          className={styles["dropdownIcon"]}
        />
        {showDropdown && (
          <div className={styles["dropdownContent"]}>
            <Link href="/edit">
              <div className={styles["dropdownContentItem"]}>
                <PencilIcon className={styles["dropdownContentIcon"]} />
                <p>Editar</p>
              </div>
            </Link>
            <div onClick={deleteDogAPI} className={styles["dropdownContentItem"]}>
              <TrashIcon className={styles["dropdownContentIcon"]} />
              <p>Deletar</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
