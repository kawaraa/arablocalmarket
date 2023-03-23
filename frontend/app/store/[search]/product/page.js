import { cookies } from "next/headers";
import ProductSearch from "../../../(component)/product-search";
import ProductCard from "../../../(component)/product-card";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Nprice:12,ame / title products - ALM" };

export default function ProductsByStore({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  const store = { id: "1", currency: "€", products };
  console.log("Show products based on this: >>> ", searchParams.category);
  console.log("Show products based on this: >>> ", searchParams.search);

  return (
    <div>
      <ProductSearch text={searchParams.search} scroll="180" />

      <h2 className="text-lg mb-3 font-medium lazy-l">
        {content.h2[lang][0]} <span className="font-bold">( 9 )</span> {content.h2[lang][1]}
      </h2>

      <ul className="flex flex-wrap">
        {store.products.map((p, i) => (
          <ProductCard
            lang={lang}
            currency={store.currency}
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
    id: "12",
    title: "Vegetables",
    price: 10,
    image: "/produce-vegetables-clipart.png",
    variants: 2,
    rate: 3,
  },
  { id: "12", title: "Bakery", price: 84, image: "/bread-clipart.png", variants: 10, starts: 5 },
  { id: "12", title: "Meat", price: 28, image: "/cut-of-meat-clipart.png", variants: 13, starts: 4 },
  { id: "12", title: "Seafood", price: 58, image: "/fish-clipart.png", variants: 11, starts: 2 },
  {
    id: "12",
    title: "Prepared food",
    price: 12,
    image: "/burger-prepared-food-clipart.png",
    variants: 3,
    starts: 1,
  },
  { id: "12", title: "Eggs", price: 12, image: "/dairy-clipart.png", variants: 31, starts: 3.5 },
  { id: "12", title: "Beverages", price: 85, image: "/beverages-clipart.png", variants: 52, starts: 4.5 },
  { id: "12", title: "Snacks", price: 63, image: "/snacks-clipart.png", variants: 86, starts: 1.5 },
  {
    id: "12",
    title: "dairy",
    price: 12,
    image: "/dairy-clipart.png",
    variants: 25,
    starts: 2.5,
  },
  {
    id: "12",
    title: "Spices",
    price: 74,
    image: "/condiments-sauces-spices-clipart.png",
    variants: 45,
    starts: 5,
  },
  {
    id: "12",
    title: "Cleaning",
    price: 36,
    image: "/cleaning-supplies-clipart.png",
    variants: 32,
    starts: 2.5,
  },
  { id: "12", title: "Care", price: 25, image: "/care-products-clipart.png", variants: 24, starts: 4.5 },
  { id: "12", title: "Baby", price: 43, image: "/baby-food-clipart.png", variants: 35, starts: 1 },
];
