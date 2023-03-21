"use client";
import { useContext, useEffect } from "react";
import { AppSessionContext } from "../../../../app-session-context";
import ProductSearch from "../../../../(component)/product-search";
import ProductCard from "../../../../(component)/product-card";

export default function StoreProducts({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const store = { id: "1", currency: "€", products };

  console.log("Show products based on this: >>> ", params);

  useEffect(() => {
    document.title = "Admin store products - ALM";
  }, []);

  return (
    <div>
      <ProductSearch text={searchParams.search} />

      <h2 className="text-lg mb-3 font-medium lazy-l">
        {content.h2[lang][0]} <span className="font-bold">( 9 )</span> {content.h2[lang][1]}
      </h2>

      <ul className="flex flex-wrap">
        {store.products.map((p, i) => (
          <ProductCard
            currency={store.currency}
            admin
            {...p}
            link={`/store/${store.id}/product/${p.id}`}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
}

const content = { h2: { en: ["Found", "Products"], ar: ["يوجد", "منتج"] } };

const products = [
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
