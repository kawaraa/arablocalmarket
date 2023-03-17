"use client";

import { useContext, useEffect, useState } from "react";
import { LinkButton } from "../../(component)/(styled)/button";
import Tabs from "../../(component)/(styled)/tabs";
import { AppSessionContext } from "../../app-session-context";
import StoreCard from "../../store/(component)/store-card";

export default function MyStores({ params, searchParams }) {
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
      />

      <LinkButton
        link={content.createStore.path}
        text={content.createStore.text[lang]}
        // onClick={() => setLoading(true)}
        cls="absolute top-7 right-2 shadow-none"
        iconCls="w-full"
      />

      <LinkButton
        link={content.createProduct.path}
        title={content.createProduct.text[lang]}
        icon="plus"
        // onClick={() => setLoading(true)}
        cls="fixed z-1 bottom-7 right-7 w-12 h-12 !p-0 rounded-lg"
        iconCls="w-full"
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
  createStore: { text: { en: "Create store", ar: "إنشاء متجر" }, path: "/admin/new-store" },
  createProduct: { text: { en: "Create product", ar: "إنشاء منتج" }, path: "/admin/new-product" },
};
