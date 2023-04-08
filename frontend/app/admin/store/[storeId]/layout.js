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
import shdCnt from "../../../(layout)/json/shared-content.json";
const q = "?fields=name,open&populate=cover";

export default function StoreById({ children, params: { storeId } }) {
  const router = useRouter();
  const { lang, setAppLoading, user, addMessage } = useContext(AppSessionContext);
  const [store, setStore] = useState(null);
  const image = store?.cover.data.attributes?.url || "/market-store-grocery-cartoon.jpg";

  const handleChange = async ({ target }) => {
    setAppLoading(true);
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
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  const handleCoverChange = async (file) => {
    const formData = new FormData();
    setAppLoading(true);
    try {
      formData.append("files.cover", file, file.name);
      formData.append("data", JSON.stringify({}));
      await request("store", "PUT", { query: "/" + storeId, body: formData });
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  const fetchStore = async () => {
    setAppLoading(true);
    try {
      const { data } = await request("store", "GET", { query: `/${storeId}${q}` });
      data.attributes.id = data.id;
      setStore(data.attributes);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    if (!user) router.replace("/signin");
    else fetchStore();
  }, [user]);

  if (!user || !store) return null;
  return (
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
