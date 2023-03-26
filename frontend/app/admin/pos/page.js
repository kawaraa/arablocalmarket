"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";
import Modal from "../../(component)/(styled)/modal";
import SearchBox from "../../(component)/(styled)/search-box";
import ProductCard from "../../(component)/product-card";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import BarcodeScanner from "../../(component)/barcode-scanner";

export default function Admin({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [store, setStore] = useState({ id: "", currency: "€", products: fakeProducts });
  const [foundProducts, setFoundProducts] = useState([]);

  const [showScanner, setShowScanner] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = async (searchText) => {
    if (showScanner) setShowScanner(false);
    setSearch(searchText);
  };

  const selectProduct = () => {
    console.log("A");
  };

  // console.log("Todo: Show store based on this: >>> storeId: ", searchParams.storeId);

  useEffect(() => {
    setFoundProducts(store.products);
    document.title = content.title[lang] + " - ALM";
  }, []);

  return (
    <>
      <article>
        <div className="flex fixed top-0 right-0 left-0 sm:mx-auto sm:w-1/3 pt-3 pb-1 px-1 bg-bg dark:bg-db lazy-cg">
          <SearchBox
            label={content.search[lang]}
            onSearch={setSearch}
            search={search}
            // onFinish={handleSearch}
            inCls="p-2"
            cls="flex-1 "
          />

          <button
            type="button"
            onClick={() => setShowScanner(true)}
            title="Show search filter"
            aria-label="Search filter"
            aria-expanded="true"
            aria-haspopup="dialog"
            className="w-10 p-1 hover:text-pc transition">
            <SvgIcon name="scan" />
          </button>
        </div>

        <h1 className="text-lg my-3 text-center font-medium lazy-l">
          {content.h1[lang][0]} <span className="font-bold">( {foundProducts.length} )</span>{" "}
          {content.h1[lang][1]}
        </h1>

        <ul className="flex flex-wrap">
          {foundProducts.map((p, i) => (
            <ProductCard lang={lang} currency={store.currency} admin {...p} link={selectProduct} key={i} />
          ))}
        </ul>
      </article>

      <Modal title={content.scanner[lang]} open={showScanner} center>
        <BarcodeScanner
          onDetect={handleSearch}
          onError={(e) => console.log("Scanner Error: >>> " + e)}
          onClose={() => setShowScanner(false)}
          cls="mt-5"
        />
      </Modal>
    </>
  );
}

const content = {
  title: { en: "Admin Point of sale", ar: "نقاط البيع الإدارية" },
  h1: { en: ["Found", "Products"], ar: ["يوجد", "منتج"] },
  search: { en: "Search for a product", ar: "ابحث عن منتج" },
  okBtn: { en: "Search", ar: "بحث" },
  scanner: { en: "Scan a product barcode", ar: "مسح رمز أو رقم المنتج" },
};

const fakeProducts = [
  {
    id: "321",
    title: "Prepared food",
    description: "Some product rich text description",
    image: "/burger-prepared-food-clipart.png",
    price: 12,
    variants: 3,
    ratings: { stars: 3, total: 265 },
  },
  { id: "6765", title: "Eggs", price: 12, image: "/dairy-clipart.png", variants: 31, starts: 3.5 },
  { id: "982", title: "Beverages", price: 85, image: "/beverages-clipart.png", variants: 52, starts: 4.5 },
  { id: "5367", title: "Snacks", price: 63, image: "/snacks-clipart.png", variants: 86, starts: 1.5 },
  {
    id: "12",
    title: "dairy",
    price: 12,
    image: "/dairy-clipart.png",
    variants: 25,
    starts: 2.5,
  },
];
