"use client";

import { useContext } from "react";
import { AppSessionContext } from "../../app-session-context";
import Tabs from "../../(component)/(styled)/tabs";

export default function Client({ params, searchParams }) {
  const { lang, user } = useContext(AppSessionContext);

  console.log("Client: >>>");

  return (
    <div>
      <h1>{content.h1[lang]}</h1>

      {/* <Tabs
        tabs={content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }))}
        onTabChange={setActiveTab}
        cls="z-1 sticky top-14 md:top-16 bg-bg dark:bg-dbg"
      /> */}
    </div>
  );
}

const content = {
  h1: { en: "Clients", ar: "العملاء" },
  // tabs: [
  //   { key: "my", path: "/admin/store?tab=my", text: { en: "My stores", ar: "متاجري" } },
  //   { key: "work", path: "/admin/store?tab=work", text: { en: "Work stores", ar: "مخازن العمل" } },
  //   { key: "favorite", path: "/admin/store?tab=favorite", text: { en: "favorite", ar: "المفضلة" } },
  // ],
};
