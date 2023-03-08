"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./(styled)/modal";
import SearchBox from "./(styled)/search-box";

export default function ProductSearch({ text }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState(text || "");

  const handleSearch = async () => {
    router.push(`${pathname}?search=${search}`);
    if (showFilter) setShowFilter(false);
  };

  return (
    <>
      <SearchBox
        label="Search for a product"
        onSearch={setSearch}
        search={search}
        // onShowFilter={setShowFilter}
        onFinish={handleSearch}
        cls="sm:w-1/3 lazy-c"
      />

      <Modal
        title="Filter the result"
        okBtn="Search"
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
