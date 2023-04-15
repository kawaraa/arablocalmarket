"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function CheckUser() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);

  useEffect(() => {
    // if (user) setTimeout(() => router.replace(user?.myStores[0] ? "/admin/store?tab=my" : "/store"), 1000);
    if (user) router.replace(user?.myStores[0] ? "/admin/store?tab=my" : "/store");
    // setTimeout(() => router.replace("/"), 1000);
  }, []);

  return null;
}
