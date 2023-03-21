"use client";

import SvgIcon from "./(styled)/svg-icon";

export default function ProductCardButtons({ id, cls }) {
  // console.log("AAA: >>>", id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
  };

  return (
    <button className={"w-5 " + cls} onClick={handleAddToFavorite}>
      <SvgIcon name="heart" />
    </button>
  );
}
