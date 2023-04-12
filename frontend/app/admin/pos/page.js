"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import { request } from "../../(service)/api-provider";
import Modal from "../../(component)/(styled)/modal";
import { Button, IconButton } from "../../(component)/(styled)/button";
import SearchBox from "../../(component)/(styled)/search-box";
import ProductCard from "../../(component)/product-card";
import BarcodeScanner from "../../(component)/barcode-scanner";
import BrowserBarcodeDetecter from "../../(component)/b-barcode-detecter";
import ProductPopup from "./(component)/product-popup";
import OrderDetailsPopup from "../../(component)/order-details-popup";
import shdCnt from "../../(layout)/json/shared-content.json";

export default function POS({ params, searchParams }) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [browserSupportBarcodeScanner, setBrowserSupportBarcodeScanner] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [store, setStore] = useState(null);
  // const [customers, setCustomers] = useState(null);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    lineItems: [],
    status: "PENDING",
    payment: { type: "ON-DELIVERY", method: "CASH" },
    delivery: "pickup",
    note: "",
  });
  const [search, setSearch] = useState("");
  const [clickedProduct, setClickedProduct] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const onScanErr = (text) => addMessage({ type: "error", text, duration: 5 });

  const handleBarcodeDetect = async (barcode) => {
    if (!barcode) return addMessage({ type: "warning", text: shdCnt.noItem[lang], duration: 2.5 });
    const p = products.find((p) => {
      const variant = p.variants.find((v) => v.barcode == barcode);
      if (variant) {
        const newItem = { productNumber: p.id, barcode: variant.barcode, price: variant.price, quantity: 1 };
        newItem.title = `${p.name} ${item.options.join(" - ")}`;
        newItem.imageUrl = p.image.data?.attributes.formats.thumbnail.url;

        addItem(newItem);
      }
    });
    if (!p) addMessage({ type: "warning", text: shdCnt.noItem[lang], duration: 2.5 });
    setSearch(barcode);
    if (showScanner) setShowScanner(false);
  };

  const addItem = (newItem) => {
    setOrder({ ...order, lineItems: [...order.lineItems, newItem] });
    if (clickedProduct) setClickedProduct(null);
  };
  const removeItem = (index, all) => {
    const copy = { ...order };
    if (all) copy.lineItems = [];
    else copy.lineItems.splice(index, 1);
    setOrder(copy);
    if (!copy.lineItems[0]) setShowOrderDetails(false);
  };

  const handleChange = ({ name, value }) => {
    setOrder({ ...order, [name]: value });
  };

  const fetchProducts = async (id) => {
    try {
      const query = `?filters[storeId][$eq]=${id}&populate[image]=*&populate[variants][populate]=*&populate[favorites]=*&populate[ratings]=*`;
      const { data } = await request("product", "GET", { query });
      setProducts(
        data.map((d) => {
          d.attributes.id = d.id;
          return d.attributes;
        })
      );
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
  };

  // This customer used to query the stores customers
  // const fetchCustomers = async (id) => {
  //   try {
  //     const CustomersQuery = `?filters[orders][store][id][$eq]=${id}&fields=user,name`;
  //     const { data } = await request("customer", "GET", { query: CustomersQuery });
  //     setCustomers(
  //       data.map(({ id, attributes }) => {
  //         attributes.id = id;
  //         return attributes;
  //       })
  //     );
  //   } catch (err) {
  //     addMessage({ type: "error", text: err.message, duration: 5 });
  //   }
  // };

  useEffect(() => {
    if (!user) router.replace("/signin");
    else {
      const store = user.myStores.find((s) => s.id == searchParams.storeId);
      if (store) {
        store.currency = store.currency.split("-")[0];
        setStore(store);
        fetchProducts(store.id);
        // fetchCustomers(store.id);
      }
    }
  }, [user]);

  useEffect(() => {
    document.title = content.title[lang] + " - ALM";

    setBrowserSupportBarcodeScanner(!!window.BarcodeDetector);
  }, []);

  const foundProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.description?.toLowerCase().includes(search) ||
      p.variants.find((v) => v.barcode.includes(search))
  );

  if (!user || !store) return null;
  return (
    <>
      <article>
        <div className="flex items-center fixed top-0 right-0 left-0 sm:mx-auto sm:w-1/2 lg:w-1/3 pt-3 pb-1 px-1 bg-bg dark:bg-db lazy-cg">
          <IconButton
            type="button"
            onClick={() => setShowScanner(true)}
            icon="scan"
            title={shdCnt.scanBtn[lang]}
            aria-expanded="true"
            aria-haspopup="dialog"
            cls="w-12 p-1 hover:text-pc transition"
          />
          <span className="w-1"></span>
          <SearchBox
            label={content.search[lang]}
            onSearch={setSearch}
            search={search}
            inCls="p-2"
            cls="flex-1 "
          />
        </div>

        <h1 className="text-lg my-3 text-center font-medium">
          {content.h1[lang][0]} <span className="font-bold">( {foundProducts.length} )</span>{" "}
          {content.h1[lang][1]}
        </h1>

        <ul dir="ltr" className="flex flex-wrap">
          {foundProducts.map((p, i) => (
            <ProductCard
              lang={lang}
              link={setClickedProduct}
              currency={store.currency}
              product={p}
              admin
              key={i}
              priority={i < 10}
            />
          ))}
        </ul>
      </article>

      <Modal title={shdCnt.scanner[lang]} open={showScanner} center>
        {browserSupportBarcodeScanner ? (
          <BrowserBarcodeDetecter
            lang={lang}
            onDetect={handleBarcodeDetect}
            onError={onScanErr}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        ) : (
          <BarcodeScanner
            lang={lang}
            onDetect={handleBarcodeDetect}
            onError={onScanErr}
            onClose={() => setShowScanner(false)}
            cls="mt-5"
          />
        )}
      </Modal>

      <ProductPopup
        lang={lang}
        open={!!clickedProduct}
        product={clickedProduct}
        onCancel={() => setClickedProduct(null)}
        setMsg={addMessage}
        onAddItem={addItem}
      />

      <OrderDetailsPopup
        open={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        onChange={handleChange}
        onRemoveItem={removeItem}
        currency={store.currency}
        // customers={customers}
        {...order}
        storeId={store.id}
        total={order.lineItems.reduce((t, it) => t + +it.price * +it.quantity, 0)}
        discount={0}
        admin
        pos
      />

      <Button
        onClick={() => setShowOrderDetails(true)}
        icon="cart"
        cls="fixed bottom-10 right-8 !text-bg !p-0 w-12 h-12 !rounded-full"
        iconCls="w-8">
        <span className="absolute -top-2 -right-1 px-1 leading-6 font-semibold text-bg text-lg bg-blur rounded-lg">
          {order.lineItems.length}
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
};
