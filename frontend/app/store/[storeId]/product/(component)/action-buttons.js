"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
import { request } from "../../../../(service)/api-provider";
import shdCnt from "../../../../(layout)/json/shared-content.json";
import { Button, IconButton } from "../../../../(component)/(styled)/button";

export default function ActionButtons({ id }) {
  const router = useRouter();
  const { lang, user, addToCart, addMessage } = useContext(AppSessionContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const showWarning = () => addMessage({ type: "warning", text: shdCnt.noItemErr[lang], duration: 4 });

  const handleBuy = () => {
    if (!checkItemInventory()) return;
    router.push("/checkout");
  };

  const handleAddToCart = async () => {
    const [item] = JSON.parse(window.localStorage.getItem("checkoutItems")) || [];
    if (!item) return showWarning();

    item.currency = item.currency.split("-")[0];
    const { phone, currency, productNumber, barcode, quantity, title, imageUrl, price, discount } = item;
    const newItem = { productNumber, barcode, title, imageUrl, price, discount, quantity };
    const store = { id: item.storeId, name: item.storeName, phone, currency, items: [newItem] };
    addToCart(store);
  };

  const handleAddToFavorite = async () => {
    if (!user) return addMessage({ type: "warning", text: shdCnt.favErr[lang], duration: 4 });

    const data = { favoriteProducts: [...favoriteProducts] };
    if (!favoriteProducts.includes(id)) data.favoriteProducts.push(id);
    else data.favoriteProducts = favoriteProducts.filter((s) => s != id);

    try {
      await request("customer", "PUT", { query: `/${user.customerId}`, body: { data } });
      setFavoriteProducts(data.favoriteProducts);
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
  };

  useEffect(() => {
    if (user?.favoriteProducts) {
      let fItems = [];
      user.favoriteProducts.forEach((s) => (fItems = fItems.concat(s.items.map((it) => it.productNumber))));
      setFavoriteProducts(fItems);
    }
  }, [user]);

  return (
    <>
      <IconButton
        icon="favorite"
        onClick={handleAddToFavorite}
        cls={`w-12 h-10 px-3 hover:text-dbg dark:hover:text-pc ${
          favoriteProducts.includes(id) ? "fill-lt" : "fill-none"
        }`}
      />

      <IconButton
        icon="cart"
        onClick={handleAddToCart}
        cls="relative w-12 h-10 px-[10px] hover:text-dbg dark:hover:text-pc">
        <span className="absolute -top-1 right-1 text-lg">+</span>
      </IconButton>

      <Button onClick={handleBuy} cls="!text-lg font-medium shadow-none">
        {content.buyBtn[lang]}
      </Button>
    </>
  );
}

const content = {
  buyBtn: { en: "Buy", ar: "شراء" },
};
