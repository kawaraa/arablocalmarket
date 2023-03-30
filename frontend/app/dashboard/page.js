"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function Dashboard({}) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);

  useEffect(() => {
    document.title = "Admin Dashboard - ALM";
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
  return (
    <div>
      <h1>Dashboard!</h1>
      <p>Widgets</p>
      <p>Statistics</p>
    </div>
  );
}

const content = {};
