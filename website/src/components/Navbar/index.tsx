import { HomeIcon, UserCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { UserDropdown } from "../UserDropdown";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import React from "react";

export function Navbar(): React.JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [ userDropdownOpen, setUserDropdownOpen ] = useState(false);

  function Home() {
    return (
      <Link href="/">
        <HomeIcon className="icon" style={{ stroke: router["pathname"] === "/" ? "#6DC6DF" : "" }} />
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
  
    function CreateIcon(): React.JSX.Element {
      return (
        <Link href="/create">
          <PlusCircleIcon className="icon" style={{ stroke: router["pathname"] === "/create" ? "#6DC6DF" : "" }} />
        </Link>
      );
    }
  
    return (
      <nav>
        <Home />
        { session.user?.email === "lucas.christian.programmer@gmail.com" ? <CreateIcon /> : null }
        <UserIcon />
        { userDropdownOpen ? <UserDropdown /> : null }
      </nav>
    );
  }
  return <nav><Home /></nav>;
}