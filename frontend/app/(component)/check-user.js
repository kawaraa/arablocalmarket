"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function CheckUser() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);

  useEffect(() => {
    if (!user?.loading && user?.myStores) router.replace(user.myStores[0] ? "/admin/store?tab=my" : "/store");
    // if (!user?.loading && user?.myStores) {
    //   setTimeout(() => router.replace(user.myStores[0] ? "/admin/store?tab=my" : "/store"), 300);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return null;
}
