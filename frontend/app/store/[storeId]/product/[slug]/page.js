import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import ActionButtons from "../action-buttons";
import Options from "../options";
import { serverRequest } from "../../../../(service)/api-provider";
import { ShareButton } from "../../../../(component)/share-button";
import shdCnt from "../../../../(layout)/json/shared-content.json";
import RatingInputPopup from "../rating-input-popup";
const q = "?fields=subscriptionStatus,name,currency,meta";
const q1 =
  "?fields=storeId,name,description,category,vendor&populate[image]=*&populate[variants][populate]=*&populate[ratings]=*";

export default async function ProductBySlug({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams.lang || "en";
  const accessToken = cookieStore.get("accessToken")?.value;

  const storeReq = serverRequest("store", "GET", { query: `/${params.storeId}${q}` });
  // Todo: make product query by ID, name, barcode E.g. UPC/IAN/EAN and description using (slug)
  const productReq = serverRequest("product", "GET", { query: `/${params.slug}${q1}`, token: accessToken });
  const data = await Promise.all([storeReq, productReq]).catch(console.error);
  if (!data || !data[0]) return notFound();

  const [storeRes, productRes] = data;
  if (!storeRes.data?.id || !productRes.data?.id) return notFound();

  storeRes.data.attributes.id = storeRes.data.id;
  const store = storeRes.data.attributes;
  productRes.data.attributes.id = productRes.data.id;
  const product = productRes.data.attributes;

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
      <div className="relative flex justify-center items-center h-32 ">
        <Image
          src={product.image.data?.attributes?.url}
          alt={product.name}
          width="1000"
          height="1000"
          className="preview h-full w-auto"
        />

        <ShareButton
          title={product.name}
          text={product.description}
          cls="block w-6 absolute top-3 right-3 hover:text-pc"
        />
      </div>

      <div className="relative text-center">
        <Options store={store} {...product} />

        <div className="absolute right-3 bottom-0 text-sm font-light">
          <span id="product-stock" className="font-medium">
            {product.variants[0].quantity}
          </span>{" "}
          {shdCnt.stock[lang]}
        </div>
      </div>

      <h2 className="text-lg my-5 text-center">{product.name}</h2>

      <h4 dir="auto" className="text-xl">
        {shdCnt.desc[lang]}
      </h4>
      <p className="text-sm mt-3 mb-10">
        <span>{product.vendor}</span>
        <br />
        {product.description}
      </p>

      <RatingInputPopup
        stars={product.ratings.stars}
        ratedStars={product.ratings.userStars}
        data={{ product: product.id }}
      />

      <div className="flex justify-around items-center fixed bottom-0 right-0 left-0 h-12 bg-lbg dark:bg-dcbg">
        <p className="min-w-12 text-red text-xl">
          {store.currency.split("-")[0]}
          <span id="product-price" className="">
            {product.variants[0].price}
          </span>
        </p>
        <ActionButtons {...product} />
      </div>
    </>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const product = await serverRequest("product", "GET", { query: `/${params.slug}${q1}` })
    .then((res) => res?.data)
    .catch(() => null);
  if (!product?.id) return {};

  const image = product.attributes?.image?.data?.attributes?.url;

  return {
    title: product.attributes.name + " - ALM",
    description: product.attributes.about,
    openGraph: {
      title: product.attributes.name,
      description: product.attributes.about,
      url: `https://arablocalmarket.com/store/${params.storeId}/product/${product.id}`,
      siteName: "ArabLocalMarket",
      images: [{ url: image, width: 600, height: 600 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.attributes.name,
      description: product.attributes.about,
      siteId: "1467726470533754880",
      creator: "@ArabLocalMarket",
      creatorId: "1467726470533754880",
      images: [image],
    },
  };
}

const content = {};
