"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";
// import SearchBox from "../../(component)/(styled)/search-box";

export default function Admin({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  // const [activeTab, setActiveTab] = useState(null);

  console.log("Todo: Show store based on this: >>> storeId: ", searchParams.storeId);

  useEffect(() => {
    document.title = "Admin Point of sale - ALM";
  }, []);

  return (
    <article>
      {/* <SearchBox
        label={content.search[lang]}
        onSearch={setSearch}
        search={search}
        onFinish={handleSearch}
        cls="sm:w-1/3 lazy-c"
      /> */}

      <h1 className="mx-2 my-3">Point of sale</h1>
    </article>
  );
}

const content = {
  search: { en: "Search for a product", ar: "ابحث عن منتج" },
  okBtn: { en: "Search", ar: "بحث" },
};
