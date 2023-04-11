"use client";

import { useContext } from "react";
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
    items[0].currency = items[0].currency.split("-")[0];

    const cartItems = JSON.parse(window.localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex((it) => it.barcode == items[0].barcode);
    if (itemIndex < 0) cartItems.push(items[0]);
    else cartItems[itemIndex].quantity = items[0].quantity;

    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    document.getElementById("nav-cart").innerHTML = cartItems.length;

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
  return shdCnt.stock[lang];
}

const content = {
  buyBtn: { en: "Buy", ar: "شراء" },
  addedToCart: { en: "Added new item to the cart", ar: "تمت إضافة عنصر جديد إلى سلة التسوق" },
  addedToFav: { en: "Added new item to the favorite", ar: "تمت إضافة عنصر جديد إلى المفضلة" },
};
