"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";

export default function Dashboard({}) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);

  useEffect(() => {
    document.title = "Admin Dashboard - ALM";
  }, []);

  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || user?.loading) return null;
  return (
    <div>
      <h1>Dashboard!</h1>
      <p>Widgets</p>
      <p>Statistics</p>
    </div>
  );
}

const content = {};
