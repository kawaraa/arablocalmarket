"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
import ProductSearch from "../../../../(component)/product-search";
import ProductCard from "../../../../(component)/product-card";
import { LinkButton } from "../../../../(component)/(styled)/button";
import { request } from "../../../../(service)/api-provider";

export default function StoreProducts({ params, searchParams }) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const { data } = await request("product", "GET", { query: `?filters[storeId][$eq]=${id}&populate=*` });
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

  useEffect(() => {
    if (!user) router.replace("/signin");
    else {
      const store = user.myStores.find((s) => s.id == params.storeId);
      if (store) {
        store.currency = store.currency.split("-")[0];
        setStore(store);
        fetchProducts(store.id);
      }
    }
  }, [user]);

  useEffect(() => {
    document.title = "Admin store products - ALM";
  }, []);

  const foundProducts = products;

  if (!store) return null;
  return (
    <div>
      <LinkButton
        href={content.createProduct.path.replace("storeId", store.id)}
        title={content.createProduct.text[lang]}
        icon="plus"
        // onClick={() => setLoading(true)}
        cls="fixed z-1 bottom-7 right-7 w-12 h-12 !p-0 rounded-lg"
        iconCls="w-full"
      />

      <ProductSearch text={searchParams.search} />

      <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
        {content.h2[lang][0]} <span className="font-bold">( {foundProducts.length} )</span>{" "}
        {content.h2[lang][1]}
      </h2>
      <ul dir="ltr" className="flex flex-wrap">
        {foundProducts.map((p, i) => (
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
    </div>
  );
}

const content = {
  h2: { en: ["Found", "Products"], ar: ["يوجد", "منتج"] },
  createProduct: {
    text: { en: "Create product", ar: "إنشاء منتج" },
    path: "/admin/store/storeId/product/new",
  },
};
