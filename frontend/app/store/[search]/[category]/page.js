import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { serverRequest } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import categories from "../../../(layout)/json/categories.json";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
// export const metadata = { title: "Store name - ALM" };

export default async function Category({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams.lang || "en";
  const storeId = params.search;

  await Promise.all(categories.map(async (c) => (c.total = await getTotal(storeId, c.key))));

  return (
    <div>
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
                <span className="absolute top-2 right-2">{c.total}</span>
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
    </div>
  );
}

const getTotal = async (storeId, category) => {
  const query = `?filters[storeId][$eq]=${storeId}&filters[category][$eq]=${category}&fields=id`;
  const catchErr = () => ({ data: [], meta: { pagination: { total: 0 } } });
  const { data, meta } = await serverRequest("product", "GET", { query }).catch(catchErr);
  return meta.pagination.total;
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
