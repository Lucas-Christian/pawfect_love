import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { Create } from "../CreateButton";
import { Home } from "./Home";
import { User } from "./User";
import React from "react";

export function Navbar(): React.JSX.Element {
  const { data: session, status } = useSession();

  const navbarStatus = {
    "loading": () => null,
    "unauthenticated": () => <UserCircleIcon className="icon" onClick={() => signIn("google", { callbackUrl: process.env["NEXTAUTH_URL"] })} /> ,
    "authenticated": () => {
      return (
        <>
          { session!.isAdmin ? <Create type="mobile" /> : null }
          <User />
        </>
      );
    }
  }

  const NavbarContent = navbarStatus[status];

  return (
    <nav>
      <Home />
      <NavbarContent />
    </nav>
  );
}