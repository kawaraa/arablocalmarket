"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
// import ProductSearch from "../../../../(component)/product-search";
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
  console.log(products[0]);
  if (!user || !store) return null;
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

      {/* <ProductSearch text={searchParams.search} /> */}

      <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
        {content.h2[lang][0]} <span className="font-bold">( 9 )</span> {content.h2[lang][1]}
      </h2>
      <ul className="flex flex-wrap">
        {products.map((p, i) => (
          <ProductCard
            lang={lang}
            currency={store.currency}
            admin
            product={p}
            link={`/admin/store/${store.id}/product/${p.id}`}
            key={i}
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

const products = [
  {
    id: "321",
    name: "Prepared food",
    description: "Some product rich text description",
    image: { src: "/burger-prepared-food-clipart.png" },
    price: 12,
    variants: 3,
    ratings: { stars: 3, total: 265 },
  },
  { id: "6765", name: "Eggs", price: 12, image: { src: "/dairy-clipart.png" }, variants: 31, starts: 3.5 },
  {
    id: "982",
    name: "Beverages",
    price: 85,
    image: { src: "/beverages-clipart.png" },
    variants: 52,
    starts: 4.5,
  },
  { id: "5367", name: "Snacks", price: 63, image: { src: "/snacks-clipart.png" }, variants: 86, starts: 1.5 },
  {
    id: "12",
    name: "dairy",
    price: 12,
    image: { src: "/dairy-clipart.png" },
    variants: 25,
    starts: 2.5,
  },
];
