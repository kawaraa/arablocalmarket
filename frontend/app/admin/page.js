"use client";

import { useContext, useEffect, useState } from "react";
import Tabs from "../(component)/(styled)/tabs";
import { AppSessionContext } from "../app-session-context";

export default function MyStores({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);

  const [activeTab, setActiveTab] = useState(null);

  // console.log("Show stores based on this: >>> ", searchParams.tab);

  useEffect(() => {
    document.title = "My Stores - ALM";
  }, []);

  // console.log(activeTab);

  return (
    <div>
      <div>
        <Tabs
          tabs={content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }))}
          onTabChange={setActiveTab}>
          {}
        </Tabs>
      </div>

      <h1>Hello from my stores page!</h1>
      <div className="flex">
        {/* <Store />
        <Store /> */}

        {/* <h1>Hello from work stores page!</h1>
      <p>Here show the stores I work at.</p> */}
      </div>
    </div>
  );
}

const content = {
  tabs: [
    { key: "1", path: "/admin?tab=my", text: { en: "My stores", ar: "متاجري" } },
    { key: "2", path: "/admin?tab=work", text: { en: "Work stores", ar: "مخازن العمل" } },
  ],
  userLinks: [{ text: { en: "Create store", ar: "إنشاء متجر" }, path: "/admin/new-store" }],
};
