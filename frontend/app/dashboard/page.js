"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function Dashboard({}) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);

  useEffect(() => {
    document.title = "Admin Dashboard - ALM";
    const id = setTimeout(() => {
      if (!user) router.replace("/signin");
    }, 1000);
    return () => clearTimeout(id);
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
