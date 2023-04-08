"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
import { Button, IconButton } from "../../../../(component)/(styled)/button";
import shdCnt from "../../../../(layout)/json/shared-content.json";

export default function ActionButtons({}) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);

  const showWarning = () => addMessage({ type: "warning", text: shdCnt.noItemErr[lang], duration: 4 });

  const handleBuy = () => {
    const items = JSON.parse(window.localStorage.getItem("checkoutItems"));
    if (!items || !items[0]) return showWarning();
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    const items = JSON.parse(window.localStorage.getItem("checkoutItems"));
    if (!items || !items[0]) return showWarning();

    const { storeId, storeName, phone, currency, productNumber, barcode, quantity } = items[0];
    const item = { productNumber, barcode, quantity };
    const newCart = { id: storeId, name: storeName, phone, currency, items: [item] };

    const carts = JSON.parse(window.localStorage.getItem("carts")) || [];
    const cartIndex = carts.findIndex((c) => c.id == storeId);

    if (cartIndex < 0) carts.push(newCart);
    else {
      const itemIndex = carts[cartIndex].items.findIndex((item) => item.barcode == barcode);
      if (itemIndex < 0) carts[cartIndex].items.push(newCart.items[0]);
      else carts[cartIndex].items[itemIndex].quantity = quantity;
    }

    window.localStorage.setItem("carts", JSON.stringify(carts));

    addMessage({ type: "success", text: content.addedToCart[lang], duration: 2.5 });
  };

  const handleAddToFavorite = () => {
    if (!user) return addMessage({ type: "warning", text: shdCnt.favErr[lang], duration: 4 });
    const items = JSON.parse(window.localStorage.getItem("checkoutItems"));
    if (!items || !items[0]) return showWarning();
    console.log("Todo: Add this item to favorite", items[0]);

    addMessage({ type: "success", text: content.addedToFav[lang], duration: 2.5 });
  };

  return (
    <>
      <IconButton
        icon="favorite"
        onClick={handleAddToFavorite}
        className="w-12 h-10 px-3 fill-none hover:text-dbg dark:hover:text-pc"
      />

      <IconButton
        icon="cart"
        onClick={handleAddToCart}
        className="relative w-12 h-10 px-[10px] hover:text-dbg dark:hover:text-pc">
        <span className="absolute -top-1 right-1 text-lg">+</span>
      </IconButton>

      <Button onClick={handleBuy} cls="!text-lg font-medium shadow-none">
        {content.buyBtn[lang]}
      </Button>
    </>
  );
}

export function Stock() {
  const { lang } = useContext(AppSessionContext);
  return content.stock[lang];
}

const content = {
  stock: { en: "in stock", ar: "في المخزون" },
  buyBtn: { en: "Buy", ar: "شراء" },
  addedToCart: { en: "Added new item to the cart", ar: "تمت إضافة عنصر جديد إلى سلة التسوق" },
  addedToFav: { en: "Added new item to the favorite", ar: "تمت إضافة عنصر جديد إلى المفضلة" },
};
