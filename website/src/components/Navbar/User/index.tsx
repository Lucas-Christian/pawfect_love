import { UserDropdown } from "./UserDropdown";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function User(): React.JSX.Element {
  const [ userDropdownOpen, setUserDropdownOpen ] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div 
        className="icon"
        onClick={() => userDropdownOpen ? setUserDropdownOpen(false) : setUserDropdownOpen(true)}
      >
        <img src={session!.user!.image!} style={{ borderRadius: "9999px" }}/>
      </div>
      { userDropdownOpen ? <UserDropdown /> : null }
    </>
  );
}
