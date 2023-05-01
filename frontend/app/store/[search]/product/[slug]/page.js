import Image from "next/image";
import { notFound } from "next/navigation";
import ActionButtons, { Stock } from "../(component)/action-buttons";
import Options from "../(component)/options";
import { serverRequest } from "../../../../(service)/api-provider";
import { ShareButton } from "../../../../(component)/share-button";
// import shdCnt from "../../../../(layout)/json/shared-content.json";
const q = "?fields=name,currency,meta";
const q1 =
  "?fields=storeId,name,description,category,vendor&populate[image]=*&populate[variants][populate]=*&populate[rating]=*";
const catchErr = () => ({ data: {}, meta: {} });

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
// export const metadata = { title: "Product Name - store name - ALM" };

export default async function ProductBySlug({ params }) {
  const res = await serverRequest("store", "GET", { query: `/${params.search}${q}` }).catch(catchErr);
  if (!res.data.id) return notFound();

  res.data.attributes.id = res.data.id;
  const store = res.data.attributes;

  // Todo: make product query by ID, name, barcode E.g. UPC/IAN/EAN and description using (slug)
  const { data } = await serverRequest("product", "GET", { query: `/${params.slug}${q1}` }).catch(catchErr);
  if (!data?.id) return notFound();

  const product = data.attributes;
  product.id = data.id;

  return (
    <>
      <div className="relative flex justify-center items-center h-32 ">
        <Image
          src={product.image.data?.attributes?.url}
          alt={product.name}
          width="600"
          height="600"
          className="preview h-full w-auto"
        />

        <ShareButton
          title={product.name}
          text={product.description}
          cls="block w-6 absolute top-3 right-3 hover:text-pc"
        />
      </div>

      <div className="relative ">
        <Options store={store} {...product} />

        <div className="absolute right-3 bottom-0 text-sm font-light">
          <span id="product-stock" className="font-medium">
            {product.variants[0].quantity}
          </span>{" "}
          {/* <span className="sr-only"> {shdCnt.stock[lang]}</span> */}
          <Stock />
        </div>
      </div>

      <h2 className="text-lg my-3">{product.name}</h2>
      <p className="text-sm mb-10">
        <span>{product.vendor}</span>
        <br />
        {product.description}
      </p>

      <div className="flex justify-around items-center fixed bottom-0 right-0 left-0 h-12 bg-lbg dark:bg-dbg">
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

const content = {};
