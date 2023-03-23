"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppSessionContext } from "../../../app-session-context";
import Tabs from "../../../(component)/(styled)/tabs";
import { InputField, ToggleSwitch } from "../../../(component)/(styled)/inputs";
import SvgIcon from "../../../(component)/(styled)/svg-icon";
import ImageUpload from "../../../(component)/(styled)/upload-image";

export default function StoreById({ children, params }) {
  const { lang } = useContext(AppSessionContext);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("Todo: Show store based on this: ID or Title: ", params.storeId);

  let imageUrl = "/img/store-2.png";
  let id = 1;
  let open = true;
  let name = "Store name";

  const handleChange = (file) => {
    setLoading(true);
    console.log("File: >> ", file);
    setLoading(false);
  };

  useEffect(() => {
    setStatus(open);
  }, []);

  return (
    <article>
      <ImageUpload
        imageUrl={imageUrl}
        onChange={handleChange}
        alt="Store cover image"
        title="Edit store cover">
        <Link
          href={`/admin/pos?storeId=${id}`}
          replace
          title="Point of sale - Store mode"
          className="absolute top-5 left-5 w-8">
          <SvgIcon name="logo" />
        </Link>
        {/* <div className="absolute inset-0 bg-blur sm:hidden rounded-2xl"></div> */}
      </ImageUpload>

      <section className="mt-5 mb-3 flex justify-between">
        <InputField editable defaultValue={name} title="Edit name" inCls="rounded-md text-xl font-bold" />

        <ToggleSwitch name="status" checked={status} onCheck={({ checked }) => setStatus(checked)}>
          <span className="mx-2">Open</span>
        </ToggleSwitch>
      </section>

      <div className="pb-6 border-b-2 border-bc">
        <Tabs
          tabs={content.tabs.map(({ key, path, text }) => ({
            key,
            path: path.replace("storeId", id),
            text: text[lang],
          }))}
          cls="z-1 sticky top-14 bg-bg dark:bg-dbg shadow-none border-none"
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
