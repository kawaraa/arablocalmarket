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
    name: "Vegetables",
    price: 10,
    image: { src: "/produce-vegetables-clipart.png" },
    variants: 2,
    rate: 3,
  },
  { id: "12", name: "Bakery", price: 84, image: { src: "/bread-clipart.png" }, variants: 10, starts: 5 },
  { id: "12", name: "Meat", price: 28, image: { src: "/cut-of-meat-clipart.png" }, variants: 13, starts: 4 },
  { id: "12", name: "Seafood", price: 58, image: { src: "/fish-clipart.png" }, variants: 11, starts: 2 },
  {
    id: "12",
    name: "Prepared food",
    price: 12,
    image: { src: "/burger-prepared-food-clipart.png" },
    variants: 3,
    starts: 1,
  },
  { id: "12", name: "Eggs", price: 12, image: { src: "/dairy-clipart.png" }, variants: 31, starts: 3.5 },
  {
    id: "12",
    name: "Beverages",
    price: 85,
    image: { src: "/beverages-clipart.png" },
    variants: 52,
    starts: 4.5,
  },
  { id: "12", name: "Snacks", price: 63, image: { src: "/snacks-clipart.png" }, variants: 86, starts: 1.5 },
  {
    id: "12",
    name: "dairy",
    price: 12,
    image: { src: "/dairy-clipart.png" },
    variants: 25,
    starts: 2.5,
  },
  {
    id: "12",
    name: "Spices",
    price: 74,
    image: { src: "/condiments-sauces-spices-clipart.png" },
    variants: 45,
    starts: 5,
  },
  {
    id: "12",
    name: "Cleaning",
    price: 36,
    image: { src: "/cleaning-supplies-clipart.png" },
    variants: 32,
    starts: 2.5,
  },
  {
    id: "12",
    name: "Care",
    price: 25,
    image: { src: "/care-products-clipart.png" },
    variants: 24,
    starts: 4.5,
  },
  { id: "12", name: "Baby", price: 43, image: { src: "/baby-food-clipart.png" }, variants: 35, starts: 1 },
];
