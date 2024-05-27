"use client";

import Categories from "#/components/navbar/Categories";
import Navbar from "#/components/navbar/Navbar";
import { useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  const userName: string | null | undefined = session?.user?.email;
  const fullName: string | null | undefined = session?.user?.name;
  // console.log("Categories session: ", session, userName);
  return (
    <>
      <Navbar userName={userName} fullName={fullName} />
      <Categories userName={userName} fullName={fullName}/>
    </>
  );
};

export default Header;
