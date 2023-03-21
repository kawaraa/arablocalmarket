"use client";

import { useContext, useEffect, useState } from "react";
import Tabs from "../../(component)/(styled)/tabs";
import { AppSessionContext } from "../../app-session-context";
import StoreCard from "../../store/(component)/store-card";

export default function Stores({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);

  // console.log("Todo, Show stores based on this: >>> ", searchParams.tab);
  // console.log("Todo, Show content based on this selected tab: >>>", activeTab);

  useEffect(() => {
    document.title = "Admin Stores - ALM";
  }, []);

  return (
    <article className="relative pt-5 ">
      <Tabs
        tabs={content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }))}
        onTabChange={setActiveTab}
        cls="z-1 sticky top-14 md:top-16 bg-bg dark:bg-dbg"
      />

      {/* <h1 className="mx-2 my-3">Found ( 3 ) stores</h1> */}

      <ul className="flex flex-wrap mx-auto mb-16">
        <StoreCard
          Tag="li"
          admin
          link={"/admin/store/1"}
          name="Store name 1"
          imageUrl="/img/store-3.png"
          totalOrders={2311}
          employees={2}
          ratings={{ stars: 3, total: 138 }}
          favorites={244}
          open={false}
          cls="w-full sm:w-1/2 xl:w-1/3"
        />

        <StoreCard
          Tag="li"
          admin
          link={"/admin/store/2"}
          name="Store name 2"
          imageUrl="/img/store-5.png"
          totalOrders={12163}
          employees={1}
          ratings={{ stars: 3.5, total: 252 }}
          favorites={95}
          open={false}
          cls="w-full sm:w-1/2 xl:w-1/3"
        />
      </ul>
    </article>
  );
}

const content = {
  tabs: [
    { key: "1", path: "/admin/store?tab=my", text: { en: "My stores", ar: "متاجري" } },
    { key: "2", path: "/admin/store?tab=work", text: { en: "Work stores", ar: "مخازن العمل" } },
  ],
};
