import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { categories } from "../../../(component)/custom-inputs";

export default function StoreCategories({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  const store = { id: 1, categories };

  return (
    <>
      <h2 className="text-lg mb-3 ml-2 font-medium">{content.h2[lang]}</h2>

      <ul className="flex flex-wrap">
        {store.categories.map((c, i) => (
          <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c" key={i}>
            <Link
              href={`/store/${store.id}/product?category=${c.text.en.replace(/\s/gim, "")}`}
              className="relative block w-full h-full p-2 pt-3 bg-cbg card cd_hr rounded-xl duration-200">
              <span className="absolute top-2 right-2">{c.numberOfItems}</span>
              <div className="overflow-hidden h-16 flex justify-center items-center">
                <Image src={c.image} alt={c.text[lang]} width="250" height="250" className="h-full w-auto" />
              </div>
              <h3 className="text-sm text-center mt-2">{c.text[lang]}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const content = {
  h2: { en: "Categories", ar: "الفئات" },
};
