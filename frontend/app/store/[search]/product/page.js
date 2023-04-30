import { cookies } from "next/headers";
import { serverRequest } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import ProductSearch from "../../../(component)/product-search";
import ProductCard from "../../../(component)/product-card";
import PaginationButtons from "./(component)/pagination-buttons";
const q = "?fields=currency";

export default async function ProductsByStore({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams.lang || "en";
  const storeId = params.search;

  const res = await serverRequest("store", "GET", { query: `/${storeId}${q}` }).catch(() => null);
  const currency = res?.data?.attributes.currency.split("-");
  const { data, meta } = await getProducts(storeId, searchParams);

  return (
    <>
      {/* searchParams.search || searchParams.category */}
      <ProductSearch text={""} scroll="180" />

      <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
        {shdCnt.foundProducts[lang][0]}
        <span className="font-bold">( {meta.pagination.total} )</span> {shdCnt.foundProducts[lang][1]}
      </h2>

      <ul dir="ltr" className="flex flex-wrap min-h-[30vh]">
        {data.map((p, i) => (
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

      <PaginationButtons lang={lang} query={searchParams} pagination={meta.pagination} />
    </>
  );
}

const getProducts = async (storeId, { category, search, page }) => {
  if (!page) page = 1;
  let sq = ``;
  if (category) sq = `&filters[category][$eq]=${category}`;
  else if (search) {
    sq = `&filters[$or][0][name][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][variants][barcode][$contains]=${search}`;
  }

  const query = `?filters[storeId][$eq]=${storeId}${sq}&fields=id,storeId,name,category&populate[image]=*&populate[ratings]=*&populate[variants][fields]=price&pagination[page]=${page}&pagination[pageSize]=16&sort=createdAt:desc`;

  const catchErr = () => ({ data: [], meta: { pagination: { page: 1, total: 0 } } });
  return serverRequest("product", "GET", { query }).catch(catchErr);
};

const content = {};
