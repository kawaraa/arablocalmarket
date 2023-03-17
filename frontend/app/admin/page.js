"use client";

import { useContext, useEffect, useState } from "react";
import Tabs from "../(component)/(styled)/tabs";
import { AppSessionContext } from "../app-session-context";
import StoreCard from "../store/(component)/store-card";

export default function MyStores({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    document.title = "Admin dashboard - ALM";
  }, []);

  console.log("Todo, Show content based on this selected tab: >>>", activeTab);

  return (
    <article>
      <h1 className="mx-2 my-3">Admin dashboard</h1>
    </article>
  );
}

const content = {};
