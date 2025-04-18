"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import Modal from "./(styled)/modal";
import SearchBox from "./(styled)/search-box";
// import { IconButton } from "./(styled)/button";
// import SvgIcon from "./(styled)/svg-icon";

export default function ProductSearch({ text, scroll, onSearch }) {
  const { lang } = useContext(AppSessionContext);
  const router = useRouter();
  const pathname = usePathname();

  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState(text || "");

  const handleSearch = async () => {
    router.push(`${pathname}?search=${search}`);
    if (showFilter) setShowFilter(false);
  };

  useEffect(() => {
    if (+scroll) setTimeout(() => window.scroll(0, scroll), 500);
  }, [scroll]);

  return (
    <>
      <div className="flex mb-3">
        {/* <IconButton
          type="button"
          icon="filter"
          onClick={() => setShowFilter(true)}
          title="Show search filter"
          aria-label="Search filter"
          aria-expanded="true"
          aria-haspopup="dialog"
          className="w-8 p-1 hover:text-pc transition"
        /> */}

        <SearchBox
          label={content.search[lang]}
          onSearch={onSearch || setSearch}
          search={search}
          onFinish={handleSearch}
          cls="flex-1 sm:flex-none lazy-b"
        />
      </div>

      <Modal
        lang={lang}
        title={content.filter[lang]}
        okBtn={content.okBtn[lang]}
        open={showFilter}
        onApprove={handleSearch}
        onCancel={() => setShowFilter(false)}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="pointer-events-none w-full"
            fill="none"
            aria-hidden="true">
            <path
              d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H13.5M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        }>
        <div className="text-left">
          <p>
            Sort products by:
            <br />
            created date
            <br />
            updated date
            <br />
            price, quantity
          </p>
        </div>
      </Modal>
    </>
  );
}

const content = {
  search: { en: "Search for a product", ar: "ابحث عن منتج" },
  filter: { en: "Filter the result", ar: "فلتر النتيجة" },
  okBtn: { en: "Search", ar: "بحث" },
};
