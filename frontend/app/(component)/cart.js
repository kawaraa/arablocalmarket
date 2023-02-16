"use client";

import Link from "next/link";
import icons from "../(component)/(styled)/icons";

export default function Cart({ numberOfItems = "0" }) {
  return (
    <Link href="/cart" className="relative flex ">
      <span className="transition max-w-[20px] text-l-c dark:text-d-c hover:text-l-tc dark:hover:text-d-tc">
        {icons.cart}
      </span>
      <span className="text-sm font-medium text-red -mt-1">{numberOfItems}</span>
    </Link>
  );
}
