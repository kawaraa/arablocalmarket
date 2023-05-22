"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import shdCnt from "../(layout)/json/shared-content.json";
import SvgIcon from "./(styled)/svg-icon";
import { request } from "../(service)/api-provider";

export default function ProductCardButtons({ productId, variantsNumber, title, admin }) {
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const handleAddToFavorite = async (e) => {
    if (!user) return addMessage({ type: "warning", text: shdCnt.favErr[lang], duration: 4 });

    const data = { favoriteProducts: [...favoriteProducts] };
    if (!favoriteProducts.includes(productId)) data.favoriteProducts.push(productId);
    else data.favoriteProducts = favoriteProducts.filter((s) => s != productId);

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

  const getCls = () => (favoriteProducts?.includes(productId) ? "text-red fill-red" : "fill-none");

  return (
    <>
      <span className="flex-1"></span>
      {admin ? (
        <div className="flex items-center">
          {variantsNumber}
          <span role="img" className="w-[18px] ml-1" title={title}>
            <SvgIcon name="boxes" />
          </span>
        </div>
      ) : (
        <button className={`w-5 hover:text-red ${getCls()}`} onClick={handleAddToFavorite}>
          <SvgIcon name="heart" />
        </button>
      )}
    </>
  );
}
