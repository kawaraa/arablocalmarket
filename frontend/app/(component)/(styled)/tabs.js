"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Tabs({ children, tabs, title, onTabChange, cls }) {
  const p = usePathname();
  const search = useSearchParams();
  const current = search.toString();

  const [active, setActive] = useState(null);
  const [bar, setBar] = useState([0, 0]);

  const handleBarChange = ({ target: { offsetLeft, offsetWidth } }) => {
    setBar([offsetLeft, offsetWidth]);
    setTimeout(() => setBar([offsetLeft, 0]), 200);
  };

  const getActiveCls = (key) => (key != active?.key ? "" : "border-b-[1px] border-red");

  useEffect(() => {
    const clean = (a, b) => (a + (b || "")).replace(/[^\w\s]/gi, "");
    const t = tabs.find((t) => clean(p, current) == clean(t.path));
    setActive(t);
    if (onTabChange) onTabChange(t);
  }, [p, current]);

  return (
    <div className={`p-3 mb-3 md:mb-6 border border-bc shadow rounded-md ${cls}`}>
      {title && <h2 className="pb-3 font-semibold text-lt text-xl font-medium">{title}</h2>}

      {/* flex-auto col-span-full xl:col-span-6  */}

      <div className="relative border-b-[1px] border-bc">
        <ul className="overflow-x-scroll no-scrollbar text-sm font-medium flex">
          {tabs.map((t, i) => (
            <li className="px-3" key={i}>
              {/* role="tab" */}
              <Link
                href={t.path}
                className={`block whitespace-nowrap py-3 ${getActiveCls(t.key)}`}
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
