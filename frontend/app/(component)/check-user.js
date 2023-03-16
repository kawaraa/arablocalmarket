"use client";

import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function CheckUser() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);
  // console.log("AAA: >>>", a);

  // useEffect(() => { }, []);

  // if (user?.hasStore) router.push("/my");
  // else if (user) router.push("/store");

  if (user) router.push(!user.hasStore ? "/store" : "/admin/store");

  return null;
}
