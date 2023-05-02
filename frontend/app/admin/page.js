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
    const id = setTimeout(() => !user && router.replace("/signin"), 1000);
    return () => clearTimeout(id);
  }, [user]);

  if (!user) return null;
  return (
    <article>
      <h1 className="mx-2 my-3">Admin dashboard</h1>
    </article>
  );
}

const content = {};
