import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import ProductSearch from "../../../(component)/product-search";
import ProductCard from "../../../(component)/product-card";
import { serverRequest } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import categories from "../../../(layout)/json/categories.json";
const q = "?fields=currency";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Nprice:12,ame / title products - ALM" };

export default async function ProductsByStore({ params, searchParams: { lang, search, category } }) {
  const cookieStore = cookies();
  lang = cookieStore.get("lang")?.value || lang || "en";
  const storeId = params.search;

  // console.log("Show products based on this: >>> ", searchParams);
  // Todo: make the store query by id, title and about
  const res = await serverRequest("store", "GET", { query: `/${storeId}${q}` }).catch(() => null);
  const currency = res?.data?.attributes.currency.split("-");
  const products = await getProducts(storeId);
  const results =
    !category || category == "all" ? products : products.filter((p) => p.attributes.category == category);

  return (
    <div>
      {/* Todo: make this search on type */}
      <ProductSearch text={search} scroll="180" />

      {category == "all" ? (
        <>
          <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
            {shdCnt.category[lang]}
          </h2>

          <ul className="flex flex-wrap">
            {categories.map((c, i) => (
              <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c" key={i}>
                <Link
                  href={`/store/${storeId}/product?category=${c.key}`}
                  className="relative block w-full h-full p-2 pt-3 bg-cbg card cd_hr rounded-xl duration-200">
                  <span className="absolute top-2 right-2">
                    {products.filter((p) => p.attributes.category == c.key).length}
                  </span>
                  <div className="overflow-hidden h-16 flex justify-center items-center">
                    <Image
                      src={c.image}
                      alt={c.text[lang]}
                      width="200"
                      height="200"
                      className="h-full w-auto"
                    />
                  </div>
                  <h3 className="text-sm text-center mt-2">{c.text[lang]}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
            {content.product[lang][0]}
            <span className="font-bold">( {results.length} )</span> {content.product[lang][1]}
          </h2>
          <ul dir="ltr" className="flex flex-wrap">
            {results.map((p, i) => (
              <ProductCard
                lang={lang}
                currency={currency[0]}
                product={p.attributes}
                id={p.id}
                link={`/store/${storeId}/product/${p.id}`}
                key={i}
                priority={i < 10}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const getProducts = async (storeId) => {
  const q1 = `?filters[storeId][$eq]=${storeId}&fields=id,storeId,name,category&populate[image]=*&populate[ratings]=*&populate[variants][fields]=price`;
  const catchErr = () => ({ data: [], meta: {} });
  const { data, meta } = await serverRequest("product", "GET", { query: q1 }).catch(catchErr);
  return data || [];
};

const content = {
  product: { en: ["Found", "Products"], ar: ["يوجد", "منتج"] },
};

// The rest of the categories.
// const categories = [
//   { text: { name: "Frozen foods" }, image: "", numberOfItems: 1031 },
//   { text: { name: "Health - wellness products" }, image: "", numberOfItems: 1031 },
//   { text: { name: "Office - school supplies" }, image: "", numberOfItems: 1031 },
//   { text: { name: "Electronics" }, image: "", numberOfItems: 1031 },
//   { text: { name: "Home - kitchen supplies" }, image: "", numberOfItems: 1031 },
//   { text: { name: "Seasonal items" }, image: "", numberOfItems: 1031 },
// ];
