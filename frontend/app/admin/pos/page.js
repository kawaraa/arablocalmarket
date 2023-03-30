"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import Modal from "../../(component)/(styled)/modal";
import { Button, IconButton } from "../../(component)/(styled)/button";
import SearchBox from "../../(component)/(styled)/search-box";
import ProductCard from "../../(component)/product-card";
import BarcodeScanner from "../../(component)/barcode-scanner";
import BrowserBarcodeDetecter from "../../(component)/b-barcode-detecter";
import SelectProductPopup from "./(component)/select-product-popup";
import OrderDetailsPopup from "../../(component)/order-details-popup";

export default function Admin({ params, searchParams }) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);
  const [browserSupportBarcodeScanner, setBrowserSupportBarcodeScanner] = useState(false);
  const [store, setStore] = useState({ id: "", currency: "€", products: fakeProducts });
  const [foundProducts, setFoundProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // console.log("Todo: Show store based on this: >>> storeId: ", searchParams.storeId);

  const handleSearch = async (searchText) => {
    if (showScanner) setShowScanner(false);
    setSearch(searchText);
  };
  console.log(selectedItems);
  const addItem = (p) => {
    console.log("addItem", p);
    // selectedItems
    setSelectedItems(fakeItems);
    setClickedProduct(null);
  };
  const removeItem = (index) => {
    console.log("Removing item", index);
    setSelectedItems(fakeItems.filter((_, i) => i !== index));
    // if (!fakeItems[1]) setShowOrderDetails(false);
  };

  const handleStatusChange = ({ target: { value } }) => {
    console.log(value);
    setClickedOrder({ ...clickedOrder, status: value });
  };

  useEffect(() => {
    setFoundProducts(store.products);
    document.title = content.title[lang] + " - ALM";

    setBrowserSupportBarcodeScanner(!!window.BarcodeDetector);
  }, []);

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
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
          <IconButton
            type="button"
            handler={() => setShowScanner(true)}
            icon="scan"
            title="Show search filter"
            aria-label="Search filter"
            aria-expanded="true"
            aria-haspopup="dialog"
            cls="w-10 p-1 hover:text-pc transition"
          />
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

      <OrderDetailsPopup
        lang={lang}
        open={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        onStatusChange={handleStatusChange}
        onRemoveItem={removeItem}
        lineItems={selectedItems}
        currency={"€"}
        discount={0}
        total={120}
        status={"PENDING"}
        payment={{ type: "ON-DELIVERY", method: "CASH" }}
        note={""}
        admin
        pos
      />

      <Button
        handler={() => setShowOrderDetails(true)}
        icon="cart"
        cls="fixed bottom-10 right-8 !text-bg !p-0 w-10 h-10 !rounded-full"
        iconCls="w-8">
        <span className="absolute -top-3 -right-1 font-semibold text-red text-lg">
          {selectedItems.length || 10}
        </span>
      </Button>
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

const fakeItems = [
  {
    title: "Prepared food - small",
    image: "/produce-vegetables-clipart.png",
    price: 12.5,
    quantity: 2,
    discount: 0,
  },
];

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
