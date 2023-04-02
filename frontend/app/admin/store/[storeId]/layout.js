"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "../../../app-session-context";
import Tabs from "../../../(component)/(styled)/tabs";
import { InputField, ToggleSwitch } from "../../../(component)/(styled)/inputs";
import SvgIcon from "../../../(component)/(styled)/svg-icon";
import ImageUpload from "../../../(component)/(styled)/upload-image";
import { LinkButton } from "../../../(component)/(styled)/button";
import { request } from "../../../(service)/api-provider";
import Loader from "../../../(layout)/loader";

export default function StoreById({ children, params: { storeId } }) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const image = store?.image?.url || "/market-store-grocery-cartoon.jpg";

  const handleChange = async ({ target }) => {
    setLoading(true);
    try {
      const data = {};
      if (target?.name == "name") data.name = target.value;
      else {
        data.open = target.checked;
        setStore({ ...store, open: target.checked });
      }
      await request("store", "PUT", { query: "/" + storeId, body: { data } });

      setTimeout(() => target?.blur(), 200);
    } catch (error) {
      addMessage({ type: "Error", text: error.message, duration: 15 });
    }
    setLoading(false);
  };

  const handleCoverChange = async (file) => {
    const formData = new FormData();
    setLoading(true);
    try {
      formData.append("files.cover", file, file.name);
      formData.append("data", JSON.stringify({}));
      await request("store", "PUT", { query: "/" + storeId, body: formData });
      addMessage({ type: "Success", text: "done", duration: 5 });
    } catch (error) {
      addMessage({ type: "Error", text: error.message, duration: 15 });
    }
    setLoading(false);
  };

  const fetchStore = async () => {
    try {
      const { id, attributes } = await request("store", "GET", { query: "/" + storeId + "?populate=*" });
      attributes.id = id;
      if (attributes.cover?.data) {
        attributes.image = { id: attributes.cover.data.id, ...attributes.cover.data.attributes };
      }
      setStore(attributes);
    } catch (error) {
      addMessage({ type: "Error", text: error.message, duration: 15 });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) router.replace("/signin");
    else fetchStore();
  }, [user]);

  if (!user || !store) return null;
  return (
    <>
      <article>
        <ImageUpload
          id="store-cover"
          imageUrl={image}
          onFile={handleCoverChange}
          alt="Store cover image"
          title="Edit store cover">
          <Link
            href={`/admin/pos?storeId=${storeId}`}
            title="Point of sale - Store mode"
            className="absolute top-5 right-5 w-8">
            <SvgIcon name="logo" />
          </Link>
          {/* <div className="absolute inset-0 bg-blur sm:hidden rounded-2xl"></div> */}
          <LinkButton href={"/admin/new-store?id=" + storeId} cls="absolute bottom-2 left-5 ">
            Edit
          </LinkButton>
        </ImageUpload>

        <section className="mt-5 mb-3 flex justify-between">
          <InputField
            editable
            name="name"
            defaultValue={store.name}
            onBlur={handleChange}
            title="Edit name"
            cls="store-name"
            inCls="rounded-md text-xl font-bold"
          />

          <ToggleSwitch name="open" checked={store.open} onChange={handleChange}>
            <span className="mx-2">Open</span>
          </ToggleSwitch>
        </section>

        <div className="pb-6 border-b-2 border-bc">
          <Tabs
            tabs={content.tabs.map(({ key, path, text }) => ({
              key,
              path: path.replace("storeId", storeId),
              text: text[lang],
            }))}
            cls="z-1 sticky top-14 bg-bg dark:bg-dbg shadow-none border-none"
          />
          <section className="">{children}</section>
        </div>
      </article>
      {loading && <Loader size="100" screen />}
    </>
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
