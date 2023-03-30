"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function CheckUser() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);
  if (user) router.replace(user?.myStores[0] ? "/admin/store" : "/store");

  return null;
}
