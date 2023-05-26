import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { MobileCreate } from "../CreateButton";
import { Home } from "./Home";
import { User } from "./User";
import React from "react";

export function Navbar(): React.JSX.Element {
  const { data: session, status } = useSession();

  return (
    <nav>
      <Home />
      { 
        status === "loading" ? "" 
        : status === "unauthenticated" ? <UserCircleIcon className="icon" onClick={() => signIn("google", { callbackUrl: process.env["NEXTAUTH_URL"] })} />
        : status === "authenticated" && session.isAdmin ? <MobileCreate /> : "" 
      }
      { 
        status === "loading" ? ""
        : status === "unauthenticated" ? <UserCircleIcon className="icon" onClick={() => signIn("google", { callbackUrl: process.env["NEXTAUTH_URL"] })} />
        : status === "authenticated" ? <User /> : "" 
      }
    </nav>
  );
}