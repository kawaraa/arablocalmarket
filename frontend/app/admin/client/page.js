"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import Tabs from "../../(component)/(styled)/tabs";
import Link from "next/link";

export default function Client({ params, searchParams }) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);

  console.log("Client: >>>");

  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
  }, [user]);

  if (!user || user.loading) return null;
  return (
    <div>
      <h1>{content.h1[lang]}</h1>
      <p>Here you will see all the clients have joined ArabLocalMarket through your referral link</p>
      <p>Client referral Earning is 25% </p>
      <p>Representative page Become Representative</p>
      <div>
        <strong>Referral / Affiliate link: </strong>
        <span>
          {window.origin}/{user.id}
        </span>
      </div>
      <p>Total earnings, Paid, Pending, Payable</p>
      <div>Table with the following header: Name, Plan, Earning</div>
      €30 / €7.5
      <p>Monthly earnings / Monthly income</p>
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
