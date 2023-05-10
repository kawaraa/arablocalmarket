"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "../../../../(component)/(styled)/button";
import { useRef } from "react";

export default function PaginationButtons({ lang, query, pagination }) {
  const pathname = usePathname();
  const divRef = useRef(null);
  const buttons = pagination?.pageCount || 1;
  const scrollUp = () => window.scroll(0, 180);
  const getCls = (q, num) => ((+q.page || 1) == num ? "bg-red text-bg" : "");
  const c = "flex justify-center items-center min-w-[35px] w-[35px] h-[35px]";
  const c1 =
    "text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

  if (buttons < 2) return null;
  return (
    <div dir="ltr" className="w-full flex" aria-label={content.label[lang]} title={content.label[lang]}>
      <IconButton
        icon="chevronDown"
        cls={"w-10 rotate-90 " + c + " rounded-b-md " + c1}
        title={content.prev[lang]}
        onClick={() => divRef.current?.scrollBy(-250, 0)}
      />

      <div
        ref={divRef}
        className="no-srl-bar w-full overflow-x-scroll flex justify-center -space-x-px scroll-smooth">
        {Array.from({ length: buttons }, (_, i) => i + 1).map((num) => (
          <Link passHref legacyBehavior href={{ pathname, query: { ...query, page: num } }} key={num}>
            <a
              onClick={scrollUp}
              className={
                c + " font-semibold border-bc border-[1px] hover:bg-red hover:text-bg " + getCls(query, num)
              }>
              {num}
            </a>
          </Link>
        ))}
      </div>

      <IconButton
        icon="chevronDown"
        cls={"w-10 -rotate-90 " + c + " rounded-b-md " + c1}
        title={content.next[lang]}
        onClick={() => divRef.current?.scrollBy(250, 0)}
      />
    </div>
  );
}

const content = {
  label: { en: "Pagination", ar: "ترقيم الصفحات" },
  next: { en: "Next", ar: "التالي" },
  prev: { en: "Previous", ar: "سابق" },
};
