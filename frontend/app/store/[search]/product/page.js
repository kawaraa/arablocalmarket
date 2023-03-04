import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "../../../(component)/(styled)/search-box";
// import StarRating from "../../../(component)/(styled)/start-rating";
import ProductButtons from "../../../(component)/product-buttons";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Nprice:12,ame / title products - ALM" };

export default function ProductsByStore({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  console.log("ProductsByStore: ", searchParams);

  const store = { id: "1", currency: "€", products };

  return (
    <div>
      {/* Pass onShowFilter function to this component */}
      <SearchBox label="Search " cls="sm:w-1/3" />

      <h2 className="text-lg mb-3 font-medium">
        Found <span className="font-bold">( 9 )</span> Products
      </h2>
      <p>Sort products by created date, updated date, price, quantity, category.</p>

      <ul className="flex flex-wrap">
        {store.products.map((p, i) => (
          <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c" key={i}>
            <Link
              href={`/store/${store.id}/product/${p.id}`}
              className="relative block w-full p-2  bg-cbg cd_hr rounded-xl duration-200">
              <h3 className="text-center mt-2">{p.title}</h3>
              <div className="overflow-hidden h-40 flex justify-center items-center">
                <Image src={p.image} width="250" height="250" alt={p.title} className="max-h-36 w-auto" />
              </div>

              {/* <StarRating stars={p.starts} cls="text-xs md:text-sm" /> */}

              <div className="flex justify-between px-2">
                <p className="text-red text-lg">
                  {store.currency}
                  {p.price}
                </p>

                <ProductButtons id={p.id} cls="fill-none" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    title: "Canned goods",
    price: 12,
    image: "/canned-food-clipart.png",
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
