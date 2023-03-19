"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import Tabs from "../(component)/(styled)/tabs";
import StoreItems from "./(component)/store-items";

export default function Cart({ params, searchParams }) {
  const router = useRouter();
  const { loading, setLoading, lang, user } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const storeCarts = fakeStores;

  const tabs = content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }));
  const favorite = activeTab?.path?.includes("favorite");

  const handleCheckout = () => {
    console.log("handleCheckout");

    // if('Uer is not selected the store show a warning.')
    router.push("/checkout");
  };

  useEffect(() => {
    document.title = (activeTab?.text || "Shipping Cart") + " - ALM";
    setSelectedStore(storeCarts[0]);
  }, [activeTab]);

  return (
    <article className="pb-14">
      <h1 className="text-xl text-center my-6">
        {activeTab?.text}
        <span className="font-bold"> ( {selectedStore?.lineItems.length} )</span>
      </h1>

      <Tabs tabs={tabs} onTabChange={setActiveTab} />

      {storeCarts.map((s, i) => (
        <StoreItems favorite={favorite} {...s} onCheck={setSelectedStore} key={i} />
      ))}

      {!favorite && (
        <button
          onClick={handleCheckout}
          dir="ltr"
          className="fixed bottom-0 right-0 left-0 h-12 flex justify-center items-center bg-pc text-t text-lg font-medium hover:text-red duration-200">
          <span className="text-red mx-2">
            {selectedStore?.currency}
            {selectedStore?.total}
          </span>
          {content.checkoutBtn[lang]}
        </button>
      )}
    </article>
  );
}

const content = {
  checkoutBtn: { en: "Checkout", ar: "الدفع" },
  tabs: [
    { key: "2", path: "/cart", text: { en: "Shopping Cart", ar: "عناصر العربة" } },
    { key: "1", path: "/cart?tab=favorite", text: { en: "Favorite", ar: "المفضلة" } },
  ],
};

const fakeItems = [
  {
    image: "/bread-clipart.png",
    title: "Tea - small",
    currency: "€",
    price: 10.5,
    discount: 0,
    quantity: 2,
    favorite: false,
  },
  {
    image: "/burger-prepared-food-clipart.png",
    title: "Tea - large",
    currency: "€",
    price: 20.5,
    discount: 0,
    quantity: 1,
    favorite: false,
  },
  {
    image: "/bread-clipart.png",
    title: "Green Tea - small",
    currency: "€",
    price: 10.5,
    quantity: 2,
    favorite: true,
  },
  {
    image: "/burger-prepared-food-clipart.png",
    title: "Green Tea - large",
    currency: "€",
    price: 20.5,
    quantity: 1,
    favorite: true,
  },
];

const fakeStores = [
  { id: "1", name: "Store 1", currency: "€", phone: "+905365646833", lineItems: fakeItems, total: 31 },
  { id: "2", name: "Store 1", currency: "€", lineItems: fakeItems, total: 31 },
];
