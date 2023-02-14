"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Breadcrumb({ items = [], separator = "/", cls = "" }) {
  // item: { content: "Home", cls: "", path: null, handler: null };
  const path = usePathname();
  const [newItems, setNewItems] = useState(items);

  useEffect(() => {
    setNewItems(
      path
        .split("/")
        .filter((r) => r)
        .map((r) => ({ content: r }))
    );
  }, [path]);

  const lastItem = newItems.length - 1;
  return (
    <ol className={`flex items-center bg-l-bg dark:bg-d-bg py-2 px-4 sm:px-6 lg:px-8 shadow ${cls}`}>
      {newItems.map((item, i) => (
        <li key={i} className={`text-l-c dark:text-d-c ${item.cls || ""}`}>
          {item.path ? (
            <Link href={item.path} className="">
              {item.content}
            </Link>
          ) : (
            <span
              className={`${i === lastItem && "text-l-tc dark:text-d-tc font-medium"}`}
              onClick={item.handler}>
              {item.content}
            </span>
          )}
          {i !== lastItem && <span className="mx-1">{separator}</span>}
        </li>
      ))}
    </ol>
  );
}
