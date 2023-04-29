"use client";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "./(styled)/button";

export default function LineItems({ favorite, bill, storeId, items, currency, onRemove, cls }) {
  return (
    <ul className={"mt-4 mb-1 space-y-3 print:!text-lg " + cls}>
      {items.map((item, i) => (
        <li className="flex " key={i}>
          <div className="overflow-hidden w-12 max-h-12 flex items-center rounded-md">
            <Image src={item.imageUrl} alt={item.title} width="150" height="150" className="w-full" />
          </div>
          <span className="w-2 h-2"></span>
          <div className="flex-1 flex">
            <div className="overflow-hidden flex-1 ml-2">
              <Link
                href={`/store/${storeId}/product/${item.productNumber}`}
                className={
                  "block truncate text-sm hover:text-pc2 print:text-3xl" +
                  (bill ? "" : "underline underline-offset-2 text-pc2")
                }>
                {item.title}
              </Link>

              <p
                className={
                  "flex w-full font-medium print:text-3xl " +
                  (bill ? "justify-end items-center" : "justify-between")
                }>
                <span className="text-red">
                  {+item.discount > 0 && (
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
            {onRemove && (
              <>
                <span className="w-2"></span>
                <IconButton
                  icon="bin"
                  size="7"
                  onClick={() => onRemove(storeId, [item.barcode])}
                  cls="hover:text-red print:hidden"
                />
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
