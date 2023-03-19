"use client";
import Image from "next/image";
import Link from "next/link";

export default function LineItems({ favorite, bill, items, currency, cls }) {
  const isDiscount = (item) => (item.discount && item.discount > 0 ? true : false);
  return (
    <ul dir="ltr" className={"mt-4 mb-1 space-y-3 " + cls}>
      {items.map((item, i) => (
        <li className="flex " key={i}>
          <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
            <Image
              src={item.image}
              alt={"Product title goes here"}
              width="150"
              height="150"
              className="w-full"
            />
          </div>
          <div className="overflow-hidden relative flex-1 ml-2">
            <Link href="/store/1/product/1" className="truncate block mb-1 text-sm hover:text-pc2">
              {item.title}
            </Link>

            <p
              className={
                "flex w-full font-medium " + (bill ? "justify-end items-center" : "justify-between")
              }>
              <span className="text-red">
                {isDiscount(item) && (
                  <span className="mr-2 line-through">
                    {currency}
                    {item.discount + item.price}
                  </span>
                )}
                {currency}
                {item.price}
              </span>
              {bill && <span className="mx-1">×</span>}
              {!favorite && <span>{item.quantity}</span>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
