"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function CheckUser() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);

  if (user?.loading) return null;
  else if (user) return router.replace(user.myStores[0] ? "/admin/store?tab=my" : "/store");
  return null;
}
