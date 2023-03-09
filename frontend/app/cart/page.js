"use client";
import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AppSessionContext } from "../app-session-context";
import Tabs from "../(component)/(styled)/tabs";
import SvgIcon from "../(component)/(styled)/svg-icon";
import Link from "next/link";
import { Radio } from "../(component)/(styled)/inputs";

export default function Cart({ params, searchParams }) {
  const p = usePathname();
  const router = useRouter();
  const { loading, setLoading, lang, user } = useContext(AppSessionContext);

  const store = { currency: "€" };

  const tabs = content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }));
  const activeTab = tabs.find((t) => t.path == p) || {};

  const selectStore = (storeId) => {
    console.log(storeId);
  };

  const handleCheckout = () => {
    console.log("handleCheckout");

    // if('Uer is not selected the store show a warning.')
    router.push("/checkout");
  };

  useEffect(() => {
    document.title = (activeTab?.text || "Shipping Cart") + " - ALM";
  }, [p]);

  const total = 40;

  return (
    <article className="pb-14">
      <h1 className="text-xl text-center my-6">
        {tabs.find((t) => t.path == p)?.text}
        <span className="font-bold"> ( 10 )</span>
      </h1>
      <Tabs tabs={tabs} />

      <section className="my-2 p-3 bg-cbg card rounded-lg">
        <div className="pb-2 flex justify-between items-center border-b-[1px] border-bc dark:border-bf">
          <Radio name="store" onCheck={() => selectStore("store-id-1")} color="red" />
          <h3 className="font-medium">Store 1 name </h3>
          <a
            href="https://wa.me/+905365646833"
            target="_blank"
            title="WhatsApp"
            aria-label="WhatsApp"
            className="inline-block w-5 text-green dark:text-pc hover:text-pc2 duration-200">
            <SvgIcon name="whatsapp" />
          </a>
        </div>

        <ul className="mt-4 mb-1 space-y-3">
          <li className="flex">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/burger-prepared-food-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative w-full mx-2">
              <Link href="/store/1/product/1" className="block text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between w-full text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt font-bold">2</span>
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/bread-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative w-full mx-2">
              <Link href="/store/1/product/1" className="block text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between w-full text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt font-bold">2</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="my-2 p-3 bg-cbg card rounded-lg">
        <div className="pb-2 flex justify-between items-center border-b-[1px] border-bc dark:border-bf">
          <Radio name="store" onCheck={() => selectStore("store-id-2")} color="red" />

          <h3 className="font-medium">Store 2 name </h3>
          <a
            href="https://wa.me/+905365646833"
            target="_blank"
            title="WhatsApp"
            aria-label="WhatsApp"
            className="inline-block w-5 text-green dark:text-pc hover:text-pc2 duration-200">
            <SvgIcon name="whatsapp" />
          </a>
        </div>

        <ul className="mt-4 mb-1 space-y-3">
          <li className="flex">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/care-products-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative w-full mx-2">
              <Link href="/store/1/product/1" className="block text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between w-full text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt font-bold">2</span>
              </p>
            </div>
          </li>
          <li className="flex">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/canned-food-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative w-full mx-2">
              <Link href="/store/1/product/1" className="block text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between w-full text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt font-bold">2</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <button
        onClick={handleCheckout}
        dir="ltr"
        className="fixed bottom-0 right-0 left-0 h-12 flex justify-center items-center bg-pc text-t text-lg font-medium hover:text-red duration-200">
        <span className="text-red mx-2">
          {store.currency}
          {total}
        </span>
        {content.checkoutBtn[lang]}
      </button>
    </article>
  );
}

const content = {
  checkoutBtn: { en: "Checkout", ar: "الدفع" },
  tabs: [
    { key: "2", path: "/cart", text: { en: "Shopping Cart", ar: "عناصر عربة" } },
    { key: "1", path: "/cart/favorite", text: { en: "Favorite", ar: "المفضلة" } },
  ],
};
