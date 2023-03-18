"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Tabs from "../../../(component)/(styled)/tabs";
import { AppSessionContext } from "../../../app-session-context";
import { InputField, ToggleSwitch } from "../../../(component)/(styled)/inputs";
import SvgIcon from "../../../(component)/(styled)/svg-icon";

export default function StoreById({ children, params }) {
  const { lang } = useContext(AppSessionContext);
  const [status, setStatus] = useState(false);
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log("Store ID, Name or Title: ", params.storeId);

  let imageUrl = "/img/store-2.png";
  let id = 1;
  let open = true;
  let name = "Store name";

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result) + setLoading(false);
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    setStatus(open);
  }, []);

  return (
    <article>
      <section className="relative overflow-hidden -mx-1 flex items-center max-h-[24vh]">
        <Image
          src={imageData || imageUrl}
          width="250"
          height="250"
          alt="Some description for the image"
          className="block w-full overlay"
        />
        {/* <div className="absolute inset-0 bg-blur sm:hidden rounded-2xl"></div> */}
        <label
          htmlFor="store-cover"
          className="absolute top-5 right-5 bg-blur text-dt w-8 border border-bc rounded-full cursor-pointer hover:text-red">
          <SvgIcon name="edit" />
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            id="store-cover"
            title="Edit store cover"
            aria-label="Edit store cover"
            className="w-0 h-0 hidden"
          />
        </label>
      </section>

      <section className="mt-5 flex justify-between lazy-c">
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
