"use client";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function CheckUser() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);

  useEffect(() => {
    if (!user?.loading && user?.myStores) {
      setTimeout(() => router.replace(user.myStores[0] ? "/admin/store?tab=my" : "/store"), 300);
    }
  }, [user]);
  return null;
}
