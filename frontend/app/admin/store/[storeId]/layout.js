"use client";

import { useContext, useEffect } from "react";
import Image from "next/image";
import Tabs from "../../../(component)/(styled)/tabs";
import { AppSessionContext } from "../../../app-session-context";

export default function StoreById({ children, params }) {
  const { lang } = useContext(AppSessionContext);

  console.log("Store ID, Name or Title: ", params.storeId);

  let imageUrl = "/img/store-3.png";
  let id = 1;
  let open = true;
  let name = "Store name";

  // useEffect(() => {}, []);

  return (
    <article>
      <section className="sm:h-[40vh] sm:bg-gradient-to-tl from-dbg via-pc to-dbg sm:rounded-2xl">
        <div className="overflow-hidden flex items-center sm:absolute sm:-bottom-10 sm:left-6 max-h-[40vh] w-full sm:w-40 rounded-2xl">
          <Image
            src={imageUrl}
            width="250"
            height="250"
            alt="Some description for the image"
            className="block w-full"
          />
        </div>

        <h1 className="w-full mt-5 text-xl font-bold flex justify-between items-center lazy-l">
          {name}
          <span className={`w-6 h-6 bg-${open ? "green" : "dt"} rounded-full mr-2`}></span>{" "}
        </h1>
      </section>

      <div className="mt-8 sm:mt-16 pb-6 border-b-2 border-bc sticky top-0">
        <Tabs
          tabs={content.tabs.map(({ key, path, text }) => ({
            key,
            path: path.replace("storeId", id),
            text: text[lang],
          }))}
          cls="sticky top-14 shadow-none border-none lazy-c"
        />
        <section className="">{children}</section>
      </div>
    </article>
  );
}

const content = {
  tabs: [
    { key: "1", path: "/admin/store/storeId", text: { en: "Orders", ar: "الطلبات" } },
    { key: "3", path: "/admin/store/storeId/product", text: { en: "Products", ar: "المنتجات" } },
    { key: "4", path: "/admin/store/storeId/employee", text: { en: "Employees", ar: "الموظفون" } },
    { key: "5", path: "/admin/store/storeId/customer", text: { en: "Customers", ar: "الزبائن" } },
  ],
};
