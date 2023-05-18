import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { UserDropdown } from "../UserDropdown";
import { useRouter } from "next/router";
import { useState } from "react";
import { Create } from "../CreateButton";
import Link from "next/link";
import React from "react";

export function Navbar(): React.JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [ userDropdownOpen, setUserDropdownOpen ] = useState(false);

  function Home() {
    return (
      <Link href="/">
        <img src="/favicon.png" className="pawLogo" width="32" height="32" />
        <HomeIcon className="icon homeIcon" style={{ stroke: router["pathname"] === "/" ? "#6DC6DF" : "" }} />
      </Link>
    );
  }

  if(status === "unauthenticated") {
    return (
      <nav>
        <Home />
        <UserCircleIcon className="icon" onClick={() => signIn("google", { callbackUrl: process.env["NEXTAUTH_URL"] })} /> 
      </nav>
    );
  }
  if(status === "authenticated") {
    function UserIcon(): React.JSX.Element {
      return (
        <div 
          className="icon"
          onClick={() => userDropdownOpen ? setUserDropdownOpen(false) : setUserDropdownOpen(true)}
        >
          <img src={session!.user!.image!} style={{ borderRadius: "9999px" }}/>
        </div>
      )
    }
  
    return (
      <nav>
        <Home />
        { session.isAdmin ? <Create type="mobile" /> : null }
        <UserIcon />
        { userDropdownOpen ? <UserDropdown /> : null }
      </nav>
    );
  }
  return <nav><Home /></nav>;
}