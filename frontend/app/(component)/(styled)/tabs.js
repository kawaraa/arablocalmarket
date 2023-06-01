"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Tabs({ children, tabs, title, onTabChange, cls }) {
  const p = usePathname();
  const search = useSearchParams();
  const current = search.toString();
  const list = useRef(null);
  const [bar, setBar] = useState([0, 0]);

  const handleBarChange = ({ target: { offsetLeft, offsetWidth } }) => setBar([offsetLeft, offsetWidth]);

  useEffect(() => {
    const clean = (a, b) => (a + (b || "")).replace(/[^\w\s]/gi, "");
    const t = tabs.find((t) => clean(p, current) == clean(t.path));

    if (!t) setBar([0, 0]);
    else {
      if (onTabChange) onTabChange(t);
      const isActive = (el) => el.getAttribute("href") == t.path;
      for (let { children } of list.current.children) {
        if (isActive(children[0])) setBar([children[0].offsetLeft, children[0].offsetWidth]);
      }
    }
  }, [p, current]);

  return (
    <div className={`mb-3 md:mb-6 border border-bc shadow rounded-md ${cls}`}>
      {title && <h2 className="pb-3 font-semibold text-lt text-xl font-medium">{title}</h2>}

      {/* flex-auto col-span-full xl:col-span-6  */}

      <div className="relative border-b-[1px] border-bc dark:border-bf">
        <ul className="flex" ref={list}>
          {tabs.map((t, i) => (
            <li className="flex-1 text-center" key={i}>
              {/* role="tab" */}
              <Link passHref legacyBehavior href={t.path}>
                <a onClick={handleBarChange} className={`relative inline-block px-1 whitespace-nowrap py-3 `}>
                  {t.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{ left: `${bar[0]}px`, width: `${bar[1]}px` }}
          className={`absolute -bottom-[1px] h-[2px] bg-red duration-300`}></div>
      </div>

      {children && <div className="mt-3 md:mt-6">{children}</div>}
    </div>
  );
}
