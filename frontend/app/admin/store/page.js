"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import Tabs from "../../(component)/(styled)/tabs";
import StoreCard from "../../store/(component)/store-card";
import EmptyState from "../../(component)/(styled)/empty-state";
import { request } from "../../(service)/api-provider";

export default function Stores() {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);
  const [myStores, setMyStores] = useState([]);
  const [workStores, setWorkStores] = useState([]);
  const result = activeTab?.key == "work" ? workStores : myStores;

  const fetchStores = async () => {
    try {
      const q1 = `?filters[owner][$eq]=${user.id}&fields=owner,name,open&populate=cover,orders,workers,ratings,favorites`;
      const res = await request("store", "GET", { query: q1 });
      setMyStores(res.data);

      const q2 = `?filters[userId][$eq]=${user.id}&fields=id&populate[workStores][populate]=owner,cover,orders,workers,ratings,favorites`;
      const { data, meta } = await request("customer", "GET", { query: q2 });
      setWorkStores(data[0].attributes.workStores.data.map((d) => ({ ...d.attributes, id: d.id })));
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 10 });
    }
  };

  useEffect(() => {
    document.title = "Admin Stores - ALM";
    if (!user) router.replace("/signin");
    else fetchStores();
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
              admin
              link={`/admin/store/${store.id}`}
              name={store.name}
              imageUrl={store.cover.data.attributes.url}
              totalOrders={store.orders}
              employees={store.workers}
              ratings={store.ratings}
              favorites={store.favorites}
              open={store.open}
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
  ],
};
