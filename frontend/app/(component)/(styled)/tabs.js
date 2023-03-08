"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Tabs({ children, tabs, title, cls }) {
  const p = usePathname();
  const [bar, setBar] = useState([0, 0]);

  const handleBarChange = ({ target: { offsetLeft, offsetWidth } }) => {
    setBar([offsetLeft, offsetWidth]);
    setTimeout(() => setBar([offsetLeft, 0]), 200);
  };

  return (
    <div className={`p-3 mb-8 md:mb-6 border border-bc shadow-lg rounded-md ${cls}`}>
      {title && <h2 className="pb-3 font-semibold text-lt text-xl font-medium">{title}</h2>}

      {/* flex-auto col-span-full xl:col-span-6  */}

      <div className="relative border-b-[1px] border-bc">
        <ul className="overflow-x-scroll no-scrollbar text-sm font-medium flex">
          {tabs.map((t, i) => (
            <li className="px-3" key={i}>
              <Link
                href={t.path}
                className={`block whitespace-nowrap py-3 ${t.path === p && "border-b-[1px] border-red"}`}
                onClick={handleBarChange}>
                {t.text}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className={`absolute -bottom-[1px] left-[${bar[0]}px] w-[${bar[1]}px] h-[2px] bg-red duration-300`}></div>
      </div>

      {children && <div className="mt-3 md:mt-6">{children}</div>}
    </div>
  );
}
