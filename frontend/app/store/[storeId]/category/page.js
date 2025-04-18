import { cookies } from "next/headers";
import { extractLang } from "../../../layout";
import { getCssDelay } from "../../../(service)/utilities";
import Link from "next/link";
import Image from "next/image";
import { serverRequest } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import categories from "../../../(layout)/json/categories.json";

export default async function Category({ params: { storeId }, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang({}, searchParams, cookieStore.get("lang")?.value);

  await Promise.all(categories.map(async (c) => (c.total = await getTotal(storeId, c.key))));
  const availableCategories = categories.filter((c) => c.total > 0);

  return (
    <div>
      <>
        <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
          {shdCnt.category[lang]}
        </h2>

        <ul className="flex flex-wrap">
          {availableCategories.map((c, i) => (
            <li
              style={getCssDelay()}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-b"
              key={i}>
              <Link passHref legacyBehavior href={`/store/${storeId}/product?category=${c.key}`}>
                <a className="relative block w-full h-full p-2 pt-3 bg-cbg card cd_hr rounded-xl duration-200">
                  <span className="absolute top-2 right-2">{c.total}</span>
                  <div className="overflow-hidden h-16 flex justify-center items-center">
                    <Image
                      src={c.image}
                      alt={c.text[lang]}
                      width="150"
                      height="80"
                      className="h-full w-auto"
                    />
                  </div>
                  <h3 className="text-sm text-center mt-2">{c.text[lang]}</h3>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}

const getTotal = async (storeId, category) => {
  const query = `?filters[storeId][$eqi]=${storeId}&filters[category][$eqi]=${category}&fields=id&pagination[pageSize]=1`;
  const { data, meta } = await serverRequest("product", "GET", { query });
  return meta.pagination.total;
};
