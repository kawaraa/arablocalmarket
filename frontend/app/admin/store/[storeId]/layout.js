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
import Dropdown from "../../../(component)/(styled)/dropdown";
const q = "?owner,fields=subscriptionStatus,name,open&populate=cover";

export default function StoreById({ children, params: { storeId } }) {
  const router = useRouter();
  const { lang, setAppLoading, user, addMessage } = useContext(AppSessionContext);
  const [store, setStore] = useState(null);
  const image = store?.cover.data?.attributes?.url || "/img/market-store-grocery-cartoon.jpg";

  const handleChange = async ({ target }) => {
    setAppLoading(true);
    try {
      const data = {};
      if (target?.name == "name") data.name = target.value;
      else {
        data.open = target.checked;
        setStore({ ...store, open: target.checked });
      }
      await request("store", "PUT", { query: `/${storeId}`, body: { data } });

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
      await request("store", "PUT", { query: `/${storeId}`, body: formData });
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
    if (!user && !user?.loading) router.replace("/signin");
    else if (!user?.loading) fetchStore();
  }, [user]);

  if (!user || user?.loading || !store) return null;
  return (
    <article className="relative">
      <ImageUpload
        id="store-cover"
        imageUrl={image}
        onFile={handleCoverChange}
        alt={store.name || content.coverAlt[lang]}
        title={content.coverEdit[lang]}>
        <Link passHref legacyBehavior href={`/admin/pos?storeId=${storeId}`}>
          <a title={content.pos[lang]} className="absolute top-5 right-5 w-8">
            <SvgIcon name="logo" />
          </a>
        </Link>
        {/* <div className="absolute inset-0 bg-blur sm:hidden rounded-2xl"></div> */}

        <LinkButton
          icon="eye"
          href={`/store/${storeId}/product`}
          cls="absolute left-5 bottom-2 !bg-blur !text-bg rounded !py-0 !px-1 hover:bg-blur"
          iconCls="w-6"
        />
      </ImageUpload>

      <Dropdown
        event="click"
        cls="!absolute -mt-10 right-4 z-2 text-lg"
        icon="threeDots"
        iconCls="w-10 md:w-10"
        btnCls="h-6 !bg-blur !text-bg hover:!text-bg !rounded-lg"
        title="View store options">
        <li className="overflow-hidden w-32">
          <Link
            passHref
            href={"/admin/new-store?id=" + storeId}
            className="block break-all px-4 py-2 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
            {shdCnt.edit[lang]}
          </Link>
        </li>
        <li className="overflow-hidden w-32">
          <Link
            passHref
            href={`/admin/store/${storeId}/plan`}
            className="block break-all px-4 py-2 hover:bg-dbg hover:text-dt dark:hover:bg-pc dark:hover:text-t duration-200">
            {content.plan[lang]}
          </Link>
        </li>
      </Dropdown>

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
          <span className="mx-2"> {shdCnt.statusStatus.open[lang]}</span>
        </ToggleSwitch>
      </section>

      <div className="pb-6">
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
  coverAlt: { en: "Store cover image", ar: "صورة غلاف المخزن" },
  coverEdit: { en: "Edit store cover", ar: "تحرير غلاف المتجر" },
  pos: { en: "Point of sale mode", ar: "وضع نقطة البيع" },
  plan: { en: "Plan", ar: "الاشتراك" },
  tabs: [
    { key: "1", path: "/admin/store/storeId", text: { en: "Orders", ar: "الطلبات" } },
    { key: "3", path: "/admin/store/storeId/product", text: { en: "Products", ar: "المنتجات" } },
    { key: "4", path: "/admin/store/storeId/employee", text: { en: "Employees", ar: "الموظفون" } },
    { key: "5", path: "/admin/store/storeId/customer", text: { en: "Customers", ar: "الزبائن" } },
  ],
};
