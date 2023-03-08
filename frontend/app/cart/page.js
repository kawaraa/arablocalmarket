"use client";
import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AppSessionContext } from "../app-session-context";
import Tabs from "../(component)/(styled)/tabs";
import SvgIcon from "../(component)/(styled)/svg-icon";
import Link from "next/link";

export default function Cart({ params, searchParams }) {
  const p = usePathname();
  const { loading, setLoading, lang, updateLang, themeMode, updateThemeMode, user } =
    useContext(AppSessionContext);

  const tabs = content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }));
  const activeTab = tabs.find((t) => t.path == p) || {};

  useEffect(() => {
    document.title = (activeTab?.text || "Shipping Cart") + " - ALM";
  }, [p]);

  return (
    <article className="">
      <h1 className="text-xl text-center my-6">
        {tabs.find((t) => t.path == p)?.text}
        <span className="font-bold"> ( 10 )</span>
      </h1>
      <Tabs tabs={tabs} />

      <section className="my-2 p-3 border border-bc rounded-lg">
        <div className="pb-2 flex justify-between items-center border-b-[1px] border-bc">
          <h3 className="font-medium">Store 1 name </h3>
          <a
            href="https://wa.me/+905365646833"
            target="_blank"
            title="WhatsApp"
            aria-label="WhatsApp"
            className="inline-block w-5 hover:text-pc2 duration-200">
            <SvgIcon name="whatsapp" />
          </a>
        </div>

        <ul className="mt-4">
          <li className="flex my-2">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/burger-prepared-food-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative ml-3 ">
              <Link href="/store/1/product/1" className="text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt mt-3 font-bold">2</span>
              </p>
            </div>
          </li>
          <li className="flex my-2">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/bread-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative ml-3 ">
              <Link href="/store/1/product/1" className="text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt mt-3 font-bold">2</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="my-2 p-3 border border-bc rounded-lg">
        <div className="pb-2 flex justify-between items-center border-b-[1px] border-bc">
          <h3 className="font-medium">Store 2 name </h3>
          <a
            href="https://wa.me/+905365646833"
            target="_blank"
            title="WhatsApp"
            aria-label="WhatsApp"
            className="inline-block w-5 hover:text-pc2 duration-200">
            <SvgIcon name="whatsapp" />
          </a>
        </div>

        <ul className="mt-4">
          <li className="flex my-2">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/care-products-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative ml-3 ">
              <Link href="/store/1/product/1" className="text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt mt-3 font-bold">2</span>
              </p>
            </div>
          </li>
          <li className="flex my-2">
            <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
              <Image
                src="/canned-food-clipart.png"
                alt={"Product title goes here"}
                width="150"
                height="150"
                className="w-full"
              />
            </div>
            <div className="relative ml-3 ">
              <Link href="/store/1/product/1" className="text-sm hover:text-pc2">
                Product title + the variant title goes here
              </Link>

              <p className="flex justify-between text-sm text-red font-medium ">
                €10.50 <span className="text-t dark:text-dt mt-3 font-bold">2</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <p>Pickup / Delivery, if delivery show the saved address or fill a new one</p>

      <div>
        <h3>Payment methods!</h3>
        Show the available methods tabs
      </div>

      <button>Checkout</button>
    </article>
  );
}

const content = {
  tabs: [
    { key: "2", path: "/cart", text: { en: "Shopping Cart", ar: "عناصر عربة" } },
    { key: "1", path: "/cart/favorite", text: { en: "Favorite", ar: "المفضلة" } },
  ],
};
