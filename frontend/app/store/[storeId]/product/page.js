import { cookies } from "next/headers";
import { serverRequest } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import categories from "../../../(layout)/json/categories.json";
import ProductSearch from "../../../(component)/product-search";
import ProductCard from "../../../(component)/product-card";
import PaginationButtons from "./(component)/pagination-buttons";
const q = "?fields=currency";

export default async function ProductsByStore({ params: { storeId }, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams.lang || "en";

  const storeReq = serverRequest("store", "GET", { query: `/${storeId}${q}` });
  const [store, { data, meta }] = await Promise.all([storeReq, getProducts(storeId, searchParams)]);
  if (!store?.data?.attributes) return notFound();

  const currency = store?.data?.attributes.currency.split("-");
  const products = data || [];

  // Todo: make this dynamic
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: product.name,
  //   image: product.image,
  //   description: product.description,
  // };

  return (
    <>
      {/* Todo: make this dynamic */}
      {/* <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> */}

      {/* searchParams.search || searchParams.category */}
      <ProductSearch text={searchParams.search} scroll="180" />

      <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
        {shdCnt.foundProducts[lang][0]}
        <strong className="font-bold"> ( {meta.pagination.total} ) </strong>
        {shdCnt.foundProducts[lang][1]}
      </h2>

      <ul dir="ltr" className="flex flex-wrap min-h-[30vh]">
        {products.map((p, i) => (
          <ProductCard
            lang={lang}
            currency={currency[0]}
            product={p.attributes}
            id={p.id}
            link={`/store/${store?.data?.id}/product/${p.id}`}
            key={i}
            priority={i < 10}
          />
        ))}
      </ul>

      <PaginationButtons lang={lang} query={searchParams} pagination={meta.pagination} />
    </>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const q = "?fields=owner,name,open,about,meta&populate=cover,ratings";
  const store = await serverRequest("store", "GET", { query: `/${params.storeId}${q}` })
    .then((res) => res?.data)
    .catch(() => null);

  if (!store?.id) return {};
  const image =
    store.attributes?.cover?.data?.attributes?.url ||
    "https://arablocalmarket.com/img/market-store-grocery-cartoon.jpg";

  return {
    title: store.attributes.name + " - ALM",
    description: store.attributes.about,
    openGraph: {
      title: store.attributes.name,
      description: store.attributes.about,
      url: `https://arablocalmarket.com/store/${store.id}/product`,
      siteName: "ArabLocalMarket",
      images: [{ url: image, width: 600, height: 600 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: store.attributes.name,
      description: store.attributes.about,
      siteId: "1467726470533754880",
      creator: "@ArabLocalMarket",
      creatorId: "1467726470533754880",
      images: [image],
    },
  };
}

const getProducts = async (storeId, { category, search, page }) => {
  const s = search?.trim() || "";
  if (!page) page = 1;
  let sq = ``;
  if (s) {
    sq = `&filters[$or][0][name][$contains]=${s}&filters[$or][1][description][$contains]=${s}&filters[$or][2][variants][barcode][$contains]=${s}`;
  } else if (category) {
    category = categories.find((c) => (c.text.en + " " + c.text.ar).toLowerCase().includes(category))?.key;
    if (category) sq = `&filters[category][$eq]=${category}`;
  }

  const query = `?filters[storeId][$eq]=${storeId}${sq}&fields=id,storeId,name,category&populate[image]=*&populate[ratings]=*&populate[variants][fields]=price&pagination[page]=${page}&pagination[pageSize]=50&sort=createdAt:desc`;

  return serverRequest("product", "GET", { query });
};

const content = {};
