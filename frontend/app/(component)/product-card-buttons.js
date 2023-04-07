"use client";
import { useContext } from "react";
import SvgIcon from "./(styled)/svg-icon";
import { AppSessionContext } from "../app-session-context";

export default function ProductCardButtons({ productId }) {
  const { user } = useContext(AppSessionContext);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    console.log("Todo: add product to customer favorite: >>> ", productId);
  };

  const getCls = () => (user.favoriteProducts.includes(productId) ? "text-red fill-red" : "fill-none");

  if (!user) return null;
  return (
    <>
      <span className="flex-1"></span>
      <button className={`w-5 hover:text-red ${getCls()}`} onClick={handleAddToFavorite}>
        <SvgIcon name="heart" />
      </button>
    </>
  );
}
