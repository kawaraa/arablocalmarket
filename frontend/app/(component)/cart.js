"use client";

import icons from "./icons";

export default function Cart({ numberOfItems = "0" }) {
  return (
    <a href="#" className="relative flex p-2">
      <span className="max-w-[20px] text-l-tc hover:text-l-c">{icons.cart}</span>
      <span className="text-sm font-medium text-l-tc -mt-1">{numberOfItems}</span>
    </a>
  );
}
