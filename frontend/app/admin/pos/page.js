"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../app-session-context";
import { request } from "../../(service)/api-provider";
import { Button } from "../../(component)/(styled)/button";
import SearchBox from "../../(component)/(styled)/search-box";
import ProductCard from "../../(component)/product-card";
import ProductPopup from "./(component)/product-popup";
import OrderDetailsPopup from "../../(component)/order-details-popup";
import BarcodeScannerPopup from "../../(component)/(styled)/barcode-scanner-popup";
import infiniteScroll from "../../(component)/infinite-scroll";
import Loader from "../../(layout)/loader";
import ScrollToTopBtn from "../../(component)/scroll-to-top-btn";

export default function POS({ params, searchParams }) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [order, setOrder] = useState({
    lineItems: [],
    status: "PENDING",
    payment: { type: "ON-DELIVERY", method: "CASH" },
    delivery: "pickup",
    note: "",
  });
  const [clickedProduct, setClickedProduct] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const storeId = useRef(null);
  const pageRef = useRef(1);
  const [total, setTotal] = useState(0);

  const addItem = (newItem) => {
    refresh("");
    if (order.lineItems.find((item) => item.barcode == newItem.barcode)) return setClickedProduct(null);
    setOrder({ ...order, lineItems: [...order.lineItems, newItem] });
    setClickedProduct(null);
  };
  const removeItem = (storeId, barcodes) => {
    const items = order.lineItems.filter((item) => !barcodes.includes(item.barcode));
    setOrder({ ...order, lineItems: items });
    if (!items[0]) setShowOrderDetails(false);
  };

  const handleChange = ({ name, value }) => {
    setOrder({ ...order, [name]: value });
  };

  const onScanErr = (text) => addMessage({ type: "error", text, duration: 5 });

  const handleSearch = (searchText) => {
    refresh(searchText.trim());
  };

  const fetchProducts = async (search) => {
    try {
      let sq = ``;
      if (search) {
        pageRef.current = 1;
        sq = `&filters[$or][0][name][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][variants][barcode][$contains]=${search}`;
      }
      const query = `?filters[storeId][$eq]=${storeId.current}${sq}&populate[image]=*&populate[variants][populate]=*&populate[favorites]=*&populate[ratings]=*&pagination[page]=${pageRef.current}&pagination[pageSize]=50&sort=createdAt:desc`;
      const { data, meta } = await request("product", "GET", { query });

      if (total < 1) setTotal(meta.pagination.total);
      const products = data.map(({ id, attributes }) => ({ id, ...attributes }));
      const p = products.find((p) => p.variants.find((v) => v.barcode == search));
      if (p) setClickedProduct(p);
      if (pageRef.current > meta.pagination.pageCount) return [];
      if (!search) pageRef.current += 1;
      return products;
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
      return [];
    }
  };

  useEffect(() => {
    if (user && user?.myStores) {
      const store = user.myStores.find((s) => s.id == searchParams.storeId);
      if (store) {
        store.currency = store.currency.split("-")[0];
        storeId.current = store.id;
        setStore(store);
      }
    }
  }, [user]);

  useEffect(() => {
    document.title = content.title[lang] + " - ALM";
  }, []);

  const { data, refresh } = infiniteScroll({
    onLoadContent: fetchProducts,
    setLoading,
    ready: !!store?.id,
  });

  if (user?.loading || !store) return null;
  else if (!user) return router.replace("/signin");
  return (
    <>
      <article>
        <div className="flex items-center fixed z-1 top-0 right-0 left-0 sm:mx-auto sm:w-1/2 lg:w-1/3 pt-3 pb-1 px-1 bg-bg dark:bg-db">
          <SearchBox label={content.search[lang]} onFinish={refresh} inCls="p-2" cls="flex-1" />
          <BarcodeScannerPopup lang={lang} onBarcodeDetect={refresh} onError={onScanErr} btnSize="10" />
        </div>

        <h1 className="text-lg my-3 text-center font-medium">
          {content.h1[lang][0]} <span className="font-bold">( {total} )</span> {content.h1[lang][1]}
        </h1>

        <ul dir="ltr" className="flex flex-wrap">
          {data.map((p, i) => (
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
        {loading && <Loader size="30" wrapperCls="my-5" />}
      </article>

      <ProductPopup
        lang={lang}
        open={!!clickedProduct}
        product={clickedProduct}
        onCancel={() => handleSearch("") + setClickedProduct(null)}
        setMsg={addMessage}
        onAddItem={addItem}
      />

      <OrderDetailsPopup
        open={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        onChange={handleChange}
        onRemoveItem={removeItem}
        currency={store.currency}
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
