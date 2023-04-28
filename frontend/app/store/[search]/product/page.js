import { cookies } from "next/headers";
import ProductSearch from "../../../(component)/product-search";
import ProductCard from "../../../(component)/product-card";
import { serverRequest } from "../../../(service)/api-provider";
const q = "?fields=currency";

export default async function ProductsByStore({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams.lang || "en";
  const storeId = params.search;

  const res = await serverRequest("store", "GET", { query: `/${storeId}${q}` }).catch(() => null);
  const currency = res?.data?.attributes.currency.split("-");
  const products = await getProducts(storeId, searchParams);

  return (
    <>
      {/* Todo: implement infinite scroll */}
      <ProductSearch text={""} scroll="180" />

      <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
        {content.product[lang][0]}
        <span className="font-bold">( {products.length} )</span> {content.product[lang][1]}
      </h2>
      <ul dir="ltr" className="flex flex-wrap">
        {products.map((p, i) => (
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
  );
}

const getProducts = async (storeId, { category, search, page }) => {
  if (!page) page = 1;
  let sq = ``;
  if (category) sq = `&filters[category][$eq]=${category}`;
  else if (search) {
    sq = `&filters[$or][0][name][$contains]=${search}&filters[$or][1][description][$contains]=${search}&filters[$or][2][variants][barcode][$contains]=${search}`;
  }

  // const query = `?filters[storeId][$eq]=${storeId.current}${sq}&pagination[page]=${pageRef.current}&pagination[pageSize]=50&populate=*&sort=createdAt:desc`;

  const query = `?filters[storeId][$eq]=${storeId}${sq}&fields=id,storeId,name,category&populate[image]=*&populate[ratings]=*&populate[variants][fields]=price&pagination[page]=${page}&pagination[pageSize]=50&sort=createdAt:desc`;
  // console.log(query);
  const catchErr = () => ({ data: [], meta: { pagination: { total: 0 } } });
  const { data, meta } = await serverRequest("product", "GET", { query }).catch(catchErr);
  return data || [];
};

const content = {
  product: { en: ["Found", "Products"], ar: ["يوجد", "منتج"] },
};
