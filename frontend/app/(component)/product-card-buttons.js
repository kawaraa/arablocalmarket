"use client";
import { useContext } from "react";
import { AppSessionContext } from "../app-session-context";
import SvgIcon from "./(styled)/svg-icon";

export default function ProductCardButtons({ productId, variantsNumber, title, admin }) {
  const { user } = useContext(AppSessionContext);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    console.log("Todo: add product to customer favorite: >>> ", productId);
  };

  const getCls = () => (user?.favoriteProducts?.includes(productId) ? "text-red fill-red" : "fill-none");

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
