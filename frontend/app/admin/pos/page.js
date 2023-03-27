"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../app-session-context";
import Modal from "../../(component)/(styled)/modal";
import SearchBox from "../../(component)/(styled)/search-box";
import ProductCard from "../../(component)/product-card";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import BarcodeScanner from "../../(component)/barcode-scanner";
import BrowserBarcodeDetecter from "../../(component)/b-barcode-detecter";
import SelectProductPopup from "./(component)/select-product-popup";

export default function Admin({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [browserSupportBarcodeScanner, setBrowserSupportBarcodeScanner] = useState(false);
  const [store, setStore] = useState({ id: "", currency: "€", products: fakeProducts });
  const [foundProducts, setFoundProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);

  const handleSearch = async (searchText) => {
    if (showScanner) setShowScanner(false);
    setSearch(searchText);
  };

  const addItem = (p) => {
    console.log("addItem", p);
    // selectedItems
    setSelectedItems([]);
    setClickedProduct(null);
  };

  // console.log("Todo: Show store based on this: >>> storeId: ", searchParams.storeId);

  useEffect(() => {
    setFoundProducts(store.products);
    document.title = content.title[lang] + " - ALM";

    setBrowserSupportBarcodeScanner(!!window.BarcodeDetector);
  }, []);

  console.log(clickedProduct);

  return (
    <>
      <article>
        <div className="flex fixed top-0 right-0 left-0 sm:mx-auto sm:w-1/2 lg:w-1/3 pt-3 pb-1 px-1 bg-bg dark:bg-db lazy-cg">
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

        <h1 className="text-lg my-3 text-center font-medium">
          {content.h1[lang][0]} <span className="font-bold">( {foundProducts.length} )</span>{" "}
          {content.h1[lang][1]}
        </h1>

        <ul className="flex flex-wrap">
          {foundProducts.map((p, i) => (
            <ProductCard
              lang={lang}
              currency={store.currency}
              admin
              {...p}
              image={p.images[0]}
              link={setClickedProduct}
              key={i}
            />
          ))}
        </ul>
      </article>

      <Modal title={content.scanner[lang]} open={showScanner} center>
        {browserSupportBarcodeScanner ? (
          <BrowserBarcodeDetecter
            onDetect={handleSearch}
            onError={(e) => console.log("Scanner Error: >>> " + e)}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        ) : (
          <BarcodeScanner
            onDetect={handleSearch}
            onError={(e) => console.log("Scanner Error: >>> " + e)}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        )}
      </Modal>

      <SelectProductPopup
        lang={lang}
        open={!!clickedProduct}
        product={clickedProduct}
        onCancel={() => setClickedProduct(null)}
        onAddItem={addItem}
      />
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
    name: "Prepared food",
    description: "Some product rich text description",
    images: [{ id: "282", src: "/burger-prepared-food-clipart.png" }],
    price: 12,
    variants: [],
    ratings: { stars: 3, total: 265 },
  },
  {
    id: "12",
    name: "Chips 1",
    category: "snack",
    description:
      "Welcome to our supermarket, where we are committed to providing you with a convenient and enjoyable shopping experience. We understand that grocery shopping can be a chore, which is why we have worked hard to create a space that is easy to navigate, well-stocked with a wide range of products, and staffed by friendly and knowledgeable team members.",
    price: 23,
    vendor: "Nutella",
    featuredImageId: "id-3231",
    ratings: { stars: 4, total: 7632 },
    images: [
      { id: "id-3231", src: "/produce-vegetables-clipart.png" },
      { id: "id-8686", src: "/dairy-clipart.png" },
    ],
    variants: [
      {
        id: "11",
        barcode: "34564321234",
        imageId: "id-3231",
        price: 13,
        comparePrice: 0,
        quantity: 15,
        weight: 1,
        weightUnit: "KG",
        options: [
          { name: "color", value: "red" },
          { name: "size", value: "small" },
          { name: "material", value: "plastic" },
        ],
      },
      {
        id: "22",
        barcode: "974321234",
        imageId: "id-8686",
        price: 8,
        comparePrice: 0,
        quantity: 10,
        weight: 2,
        weightUnit: "KG",
        options: [
          { name: "color", value: "green" },
          { name: "size", value: "small" },
          { name: "material", value: "metals" },
        ],
      },
      {
        id: "22",
        barcode: "974321234",
        imageId: "id-8686",
        price: 8,
        comparePrice: 0,
        quantity: 10,
        weight: 2,
        weightUnit: "KG",
        options: [
          { name: "color", value: "green" },
          { name: "size", value: "large" },
          { name: "material", value: "metals" },
        ],
      },
    ],
  },
];
