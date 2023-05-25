import { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Meta } from "./Meta";

type LayoutProps = { children: ReactNode; };

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
      <Navbar />
      {children}
    </>
  )
}