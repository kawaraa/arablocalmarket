"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
import { request } from "../../../../(service)/api-provider";
import shdCnt from "../../../../(layout)/json/shared-content.json";
import ProductCard from "../../../../(component)/product-card";
import { LinkButton } from "../../../../(component)/(styled)/button";
import infiniteScroll from "../../../../(component)/infinite-scroll";
import Loader from "../../../../(layout)/loader";
import SearchBox from "../../../../(component)/(styled)/search-box";
import BarcodeScannerPopup from "../../../../(component)/(styled)/barcode-scanner-popup";
import ScrollToTopBtn from "../../../../(component)/scroll-to-top-btn";

export default function StoreProducts({ params, searchParams }) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const storeId = useRef(null);
  const pageRef = useRef(1);
  const [total, setTotal] = useState(0);

  const onScanErr = (text) => addMessage({ type: "error", text, duration: 5 });

  const fetchProducts = async (search) => {
    try {
      let sq = ``;
      if (search) {
        pageRef.current = 1;
        sq = `&filters[$or][0][name][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][variants][barcode][$contains]=${search}`;
      }
      const query = `?filters[storeId][$eq]=${storeId.current}${sq}&populate=*&pagination[page]=${pageRef.current}&pagination[pageSize]=50&sort=createdAt:desc`;
      const { data, meta } = await request("product", "GET", { query });
      if (total < 1) setTotal(meta.pagination.total);
      if (pageRef.current > meta.pagination.pageCount) return [];
      if (!search) pageRef.current += 1;
      return data.map(({ id, attributes }) => ({ id, ...attributes }));
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
      return [];
    }
  };

  useEffect(() => {
    if (!user) router.replace("/signin");
    else {
      const store = user.myStores?.find((s) => s.id == params.storeId);
      if (store) {
        store.currency = store.currency.split("-")[0];
        setStore(store);
        storeId.current = store.id;
      }
    }
  }, [user]);

  useEffect(() => {
    document.title = "Admin store products - ALM";
  }, []);

  const { data, refresh } = infiniteScroll({ onLoadContent: fetchProducts, setLoading, ready: !!store?.id });

  if (!store) return null;
  return (
    <div className="pb-20">
      <LinkButton
        href={content.createProduct.path.replace("storeId", store.id)}
        title={content.createProduct.text[lang]}
        icon="plus"
        // onClick={() => setLoading(true)}
        cls="fixed z-1 bottom-7 right-7 w-12 h-12 !p-0 rounded-lg"
        iconCls="w-full"
      />

      <div className="flex items-center mb-3">
        <SearchBox onFinish={refresh} cls="flex-1" />
        <BarcodeScannerPopup lang={lang} onBarcodeDetect={refresh} onError={onScanErr} btnSize="10" />
      </div>
      <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
        {shdCnt.foundProducts[lang][0]} <span className="font-bold">( {total} )</span>{" "}
        {shdCnt.foundProducts[lang][1]}
      </h2>
      <ul dir="ltr" className="flex flex-wrap">
        {data.map((p, i) => (
          <ProductCard
            lang={lang}
            currency={store.currency}
            admin
            product={p}
            link={`/admin/store/${store.id}/product/${p.id}`}
            key={i}
            priority={i < 10}
          />
        ))}
      </ul>

      {loading && <Loader size="30" wrapperCls="my-5" />}

      <ScrollToTopBtn />
    </div>
  );
}

const content = {
  createProduct: {
    text: { en: "Create product", ar: "إنشاء منتج" },
    path: "/admin/store/storeId/product/new",
  },
};
