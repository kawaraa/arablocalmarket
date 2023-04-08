"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import Tabs from "../(component)/(styled)/tabs";
import StoreItems from "./(component)/store-items";
import { request } from "../(service)/api-provider";
import EmptyState from "../(component)/(styled)/empty-state";

export default function Cart({ params, searchParams }) {
  const router = useRouter();
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  const tabs = content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }));
  const favorite = activeTab?.path?.includes("favorite");

  const deleteFromCart = (storeId, index) => {
    const copy = [...carts];
    copy.forEach((c) => c.id == storeId && c.items.splice(index, 1));

    setCarts(copy.filter((c) => !!c.items[0]));

    if (user) {
      // Todo: remove the item from the backend
    }
  };

  const deleteFromFavorite = (storeId, index) => {
    if (!user?.favoriteProducts) return;
    const copy = [...user.favoriteProducts];
    copy.forEach((c) => c.id == storeId && c.items.splice(index, 1));
    // Todo: remove the item from the backend
    setFavoriteProducts(copy.filter((c) => !!c.items[0]));
  };

  const handleCheckout = () => {
    if (!selectedStore) return addMessage({ type: "warning", text: content.noItems[lang], duration: 2 });

    const items = selectedStore.items.map(({ productNumber, barcode, price, quantity }) => ({
      storeId: selectedStore.id,
      productNumber,
      price,
      barcode,
      quantity,
    }));

    window.localStorage.setItem("checkoutItems", JSON.stringify(items));
    window.localStorage.setItem("carts", JSON.stringify(carts.filter((c) => c.id != selectedStore.id)));
    router.push("/checkout");
  };

  const fetchItems = async () => {
    setAppLoading(true);
    try {
      setFavoriteProducts(user?.favoriteProducts || []);

      const productIds = new Set();
      let carts = JSON.parse(window.localStorage.getItem("carts"));
      if (!carts && user) carts = user.carts;

      if (carts) {
        carts.forEach((cart) =>
          cart.items.forEach((item) => productIds.add("filters[id][$in]=" + item.productNumber))
        );

        const q = "&populate[image]=*&populate[variants][populate]=*";
        const { data } = await request("product", "GET", {
          query: `?${Array.from(productIds).join("&")}${q}`,
        });

        carts = carts.filter((cart) => {
          cart.items = cart.items.filter((item) => {
            const { attributes } = data.find((d) => d.id == item.productNumber) || {};
            if (!attributes) return null;
            const variant = attributes.variants.find((v) => (v.barcode = item.barcode));
            if (!variant) return null;
            item.title = attributes.name + " " + variant.options.map((o) => o.value).join(" - ");
            item.image = attributes.image.data.attributes.url;
            item.price = variant.price;
            item.discount = attributes.discount || 0;
            cart.total = 0;
            cart.total += +variant.price * +item.quantity;
            return item;
          });
          cart.currency = cart.currency.split("-")[0];
          return !!cart.items[0];
        });

        setCarts(carts);
      }
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    document.title = (activeTab?.text || "Shipping Cart") + " - ALM";
    setSelectedStore(null);
  }, [activeTab]);

  useEffect(() => {
    window.localStorage.removeItem("checkoutItems");
    fetchItems();
  }, []);

  const results = favorite ? favoriteProducts || [] : carts;

  return (
    <article className="pb-14">
      <h1 className="text-xl text-center my-6">
        {activeTab?.text}
        <span className="font-bold"> ( {selectedStore?.items.length || 0} )</span>
      </h1>

      <Tabs tabs={tabs} onTabChange={setActiveTab} />

      {favorite
        ? favoriteProducts.map((s, i) => (
            <StoreItems favorite={favorite} {...s} onRemove={deleteFromFavorite} key={i} />
            // <LineItems
            //   favorite={favorite}
            //   items={user?.favoriteProducts}
            //   currency={store.currency}
            //   storeId={store.id}
            //   onRemove={onRemove}
            //   key={i}
            // />
          ))
        : carts.map((s, i) => (
            <StoreItems
              favorite={favorite}
              {...s}
              onCheck={setSelectedStore}
              onRemove={deleteFromCart}
              key={i}
            />
          ))}

      {!results[0] && (
        <div className="flex items-center h-[60vh]">
          <EmptyState lang={lang} type="no" />
        </div>
      )}

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
  tabs: [
    { key: "2", path: "/cart", text: { en: "Shopping Cart", ar: "عناصر العربة" } },
    { key: "1", path: "/cart?tab=favorite", text: { en: "Favorite", ar: "المفضلة" } },
  ],
  checkoutBtn: { en: "Checkout", ar: "اتمام الطلب" },
  noItems: { en: "Please select items", ar: "الرجاء تحديد العناصر" },
};
