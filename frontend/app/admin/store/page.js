"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import Tabs from "../../(component)/(styled)/tabs";
import StoreCard from "../../store/(component)/store-card";
import EmptyState from "../../(component)/(styled)/empty-state";

export default function Stores() {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);
  let result = activeTab?.key == "work" ? user.workStores : user.myStores;
  if (activeTab?.key == "favorite") result = user.favoriteStores;

  useEffect(() => {
    document.title = "Admin Stores - ALM";
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
  return (
    <article className="relative pt-5 ">
      <Tabs
        tabs={content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }))}
        onTabChange={setActiveTab}
        cls="z-1 sticky top-14 md:top-16 bg-bg dark:bg-dbg"
      />

      {!result[0] ? (
        <div className="h-[60vh] w-full flex items-center">
          <EmptyState type="no" />
        </div>
      ) : (
        <ul className="flex flex-wrap mx-auto mb-16">
          {result.map((store, i) => (
            <StoreCard
              lang={lang}
              Tag="li"
              admin={activeTab?.key != "favorite"}
              link={`/admin/store/${store.id}`}
              name={store.name}
              imageUrl={store.cover.data?.attributes.url}
              totalOrders={store.orders}
              employees={store.workers}
              ratings={store.ratings}
              favorites={store.favorites}
              open={store.open}
              distance={{ length: 0, unit: "KM" }}
              cls="w-full sm:w-1/2 xl:w-1/3"
              key={i}
            />
          ))}
        </ul>
      )}
    </article>
  );
}

const content = {
  tabs: [
    { key: "my", path: "/admin/store?tab=my", text: { en: "My stores", ar: "متاجري" } },
    { key: "work", path: "/admin/store?tab=work", text: { en: "Work stores", ar: "مخازن العمل" } },
    { key: "favorite", path: "/admin/store?tab=favorite", text: { en: "favorite", ar: "المفضلة" } },
  ],
};
