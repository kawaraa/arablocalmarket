"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import shdCnt from "../../(layout)/json/shared-content.json";
import Tabs from "../../(component)/(styled)/tabs";
import StoreCard from "../../store/store-card";
import EmptyState from "../../(component)/(styled)/empty-state";
import { LinkButton } from "../../(component)/(styled)/button";

export default function Stores() {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    document.title = "Admin Stores - ALM";
  }, []);
  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || user?.loading) return null;

  let result = activeTab?.key == "work" ? user.workStores : user.myStores;
  if (activeTab?.key == "favorite") result = user.favoriteStores;

  return (
    <>
      <article className="relative pt-5 ">
        <Tabs
          tabs={content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }))}
          onTabChange={setActiveTab}
          cls="z-1 sticky top-14 md:top-16 bg-bg dark:bg-dbg"
        />

        {!result[0] ? (
          <div className="h-[60vh] w-full flex items-center">
            <EmptyState lang={lang} type="no" />
          </div>
        ) : (
          <ul className="flex flex-wrap mx-auto mb-16">
            {result.map((store, i) => (
              <StoreCard
                lang={lang}
                Tag="li"
                admin={activeTab?.key != "favorite"}
                link={activeTab?.key == "my" ? `/admin/store/${store.id}` : `/store/${store.id}/product`}
                name={store.name}
                imageUrl={store.cover.data?.attributes?.url || "/img/market-store-grocery-cartoon.jpg"}
                totalOrders={store.orders}
                employees={store.workers}
                ratings={store.ratings}
                favorites={store.favorites}
                open={store.open}
                distance={{ length: 0, unit: "KM" }}
                key={i}
              />
            ))}
          </ul>
        )}
      </article>

      <LinkButton
        href={content.createStore.path}
        title={content.createStore.text[lang]}
        icon="plus"
        cls="fixed z-1 bottom-7 right-7 w-12 h-12 !p-0 rounded-lg"
        iconCls="w-full"
      />
    </>
  );
}

const content = {
  tabs: [
    { key: "my", path: "/admin/store?tab=my", text: { en: "My stores", ar: "متاجري" } },
    { key: "work", path: "/admin/store?tab=work", text: { en: "Work stores", ar: "مخازن العمل" } },
    { key: "favorite", path: "/admin/store?tab=favorite", text: { en: "favorite", ar: "المفضلة" } },
  ],
  createStore: { text: shdCnt.createStore, path: "/admin/new-store" },
};
