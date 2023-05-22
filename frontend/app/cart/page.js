"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { fetchUser, request } from "../(service)/api-provider";
import Tabs from "../(component)/(styled)/tabs";
import StoreItems from "./(component)/store-items";
import EmptyState from "../(component)/(styled)/empty-state";
import shdCnt from "../(layout)/json/shared-content.json";

export default function Cart({ params, searchParams }) {
  const router = useRouter();
  const { lang, user, updateUser, setAppLoading, addMessage, setCartItemsNum } =
    useContext(AppSessionContext);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const tabs = content.tabs.map(({ key, path, text }) => ({ key, path, text: text[lang] }));
  const favorite = activeTab?.path?.includes("favorite");

  const deleteFromCart = async (storeId, barcodes) => {
    const check = (b) => barcodes.includes(b);
    const copy = [...cart];
    copy.forEach((c) => c.id == storeId && (c.items = c.items.filter((it) => !check(it.barcode))));
    const c = copy.filter((c) => !!c.items[0]);
    setAppLoading(true);

    // if (!user) {
    let cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
    cartItems = cartItems.filter((it) => it.storeId == storeId && !check(it.barcode));
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // } else {
    //   try {
    //     // Todo: remove the item from the backend
    //   } catch (error) {}
    // }

    setCart(c);
    setAppLoading(false);
  };

  const deleteFromFavorite = async (storeId, barcodes) => {
    if (!user?.favoriteProducts) return;
    setAppLoading(true);

    const favoriteProducts = [];
    const check = (item) => {
      const res = barcodes.includes(item.barcode);
      if (!res) favoriteProducts.push(item.productNumber);
      return res;
    };

    const copy = [...user.favoriteProducts];
    copy.forEach((c) => c.id == storeId && (c.items = c.items.filter((it) => !check(it))));

    try {
      const data = { favoriteProducts };
      await request("customer", "PUT", { query: `/${user.customerId}`, body: { data } });
      setFavoriteProducts(data.favoriteProducts);
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
      setFavoriteProducts(copy.filter((c) => !!c.items[0]));
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }

    setAppLoading(false);
  };

  const handleCheckout = () => {
    if (!selectedStore) return addMessage({ type: "warning", text: content.noItems[lang], duration: 2 });

    const items = selectedStore.items.map(({ productNumber, barcode, title, price, quantity }) => ({
      storeId: selectedStore.id,
      productNumber,
      title,
      price,
      barcode,
      quantity,
    }));

    window.localStorage.setItem("checkoutItems", JSON.stringify(items));
    let cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
    cartItems = JSON.stringify(cartItems.filter((it) => it.storeId != selectedStore.id));
    window.localStorage.setItem("cartItems", cartItems);

    router.push("/checkout");
  };

  const mergeCartItem = async (item) => {
    try {
      console.log("Todo: Merge the local cart item with the user cart items ", item);
    } catch (err) {
      //
    }
  };

  const mergeUserAndLocalCarts = (items) => {
    if (!items || !items[0]) return [];
    const stores = [...(user?.cart || [])];

    items.forEach((item) => {
      const { phone, currency, productNumber, barcode, quantity, title, imageUrl, price, discount } = item;
      const newItem = { productNumber, barcode, title, imageUrl, price, discount, quantity };
      const store = { id: item.storeId, name: item.storeName, phone, currency, items: [newItem] };

      if (user && !user.cart?.find((c) => c.items.find((it) => it.barcode == barcode))) mergeCartItem(item);

      const storeIndex = stores.findIndex((s) => s.id == item.storeId);
      if (storeIndex < 0) return stores.push(store);

      const itemIndex = stores[storeIndex].items.findIndex((item) => item.barcode == barcode);
      if (itemIndex < 0) stores[storeIndex].items.push(newItem);
      else stores[storeIndex].items[itemIndex].quantity = quantity;
    });

    return stores;
  };

  useEffect(() => {
    setCartItemsNum(cart.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    document.title = (activeTab?.text || "Shipping Cart") + " - ALM";
    setSelectedStore(null);
    if (favorite) fetchUser().then(updateUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    window.localStorage.removeItem("checkoutItems");

    setAppLoading(true);
    setFavoriteProducts(user?.favoriteProducts || []);

    setCart(mergeUserAndLocalCarts(JSON.parse(window.localStorage.getItem("cartItems"))));

    setAppLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const results = favorite ? favoriteProducts || [] : cart;

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
          ))
        : cart.map((s, i) => (
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
            {selectedStore?.items?.reduce((t, i) => t + +i.price * +i.quantity, 0)}
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
