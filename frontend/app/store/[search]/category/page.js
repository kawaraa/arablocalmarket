import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default function StoreOverview({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  const store = { id: 1, categories };

  return (
    <>
      <h2 className="text-lg mb-3 font-medium">Categories</h2>

      <ul className="flex flex-wrap">
        {store.categories.map((c, i) => (
          <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c" key={i}>
            <Link
              href={`/store/${store.id}/product?category=${c.name.replace(/\s/gim, "")}`}
              className="relative block w-full p-2 pt-3 bg-cbg cd_hr rounded-xl duration-200">
              <span className="absolute top-2 right-2">{c.numberOfItems}</span>
              <div className="overflow-hidden h-40 flex justify-center items-center">
                <Image src={c.image} alt={c.name} width="250" height="250" className="max-h-36 w-auto" />
              </div>
              <h3 className="text-sm text-center mt-2">{c.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const content = {};

const categories = [
  { name: "Produce", image: "/produce-vegetables-clipart.png", numberOfItems: 1 },
  { name: "Bakery", image: "/bread-clipart.png", numberOfItems: 10 },
  { name: "Meat - poultry", image: "/cut-of-meat-clipart.png", numberOfItems: 13 },
  { name: "Seafood", image: "/fish-clipart.png", numberOfItems: 11 },
  { name: "Deli - prepared food", image: "/burger-prepared-food-clipart.png", numberOfItems: 3 },
  { name: "Dairy - eggs", image: "/dairy-clipart.png", numberOfItems: 31 },
  // { name: "Frozen foods", image: "", numberOfItems: 1031 },
  { name: "Beverages", image: "/beverages-clipart.png", numberOfItems: 52 },
  { name: "Snacks - candy", image: "/snacks-clipart.png", numberOfItems: 86 },
  { name: "Canned - packaged goods", image: "/canned-food-clipart.png", numberOfItems: 25 },
  // { name: "Pasta - rice", image: "", numberOfItems: 1031 },
  { name: "Condiments - sauces - spices", image: "/condiments-sauces-spices-clipart.png", numberOfItems: 45 },
  { name: "Cleaning supplies", image: "/cleaning-supplies-clipart.png", numberOfItems: 32 },
  { name: "Care products", image: "/care-products-clipart.png", numberOfItems: 24 },
  // { name: "Health - wellness products", image: "", numberOfItems: 1031 },
  { name: "Baby food - supplies", image: "/baby-food-clipart.png", numberOfItems: 35 },
  // { name: "Office - school supplies", image: "", numberOfItems: 1031 },
  // { name: "Electronics", image: "", numberOfItems: 1031 },
  // { name: "Home - kitchen supplies", image: "", numberOfItems: 1031 },
  // { name: "Seasonal items", image: "", numberOfItems: 1031 },
];
