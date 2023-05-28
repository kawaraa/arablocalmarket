"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../app-session-context";

export default function Admin({ params, searchParams }) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);
  // const [activeTab, setActiveTab] = useState(null);
  // console.log("Todo, Show content based on this selected tab: >>>", activeTab);

  useEffect(() => {
    document.title = "Admin dashboard - ALM";
  }, []);

  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || user?.loading) return null;
  return (
    <article>
      <h1 className="mx-2 my-3">Admin dashboard</h1>
    </article>
  );
}

const content = {};
