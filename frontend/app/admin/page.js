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

  if (user?.loading) return null;
  else if (!user) return router.replace("/signin");
  return (
    <article>
      <h1 className="mx-2 my-3">Admin dashboard</h1>
    </article>
  );
}

const content = {};
