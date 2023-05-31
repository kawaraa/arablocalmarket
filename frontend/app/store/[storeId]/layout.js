import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import StoreLinks from "../store-links";
import EmptyState from "../../(component)/(styled)/empty-state";
import Tabs from "../../(component)/(styled)/tabs";
import { serverRequest } from "../../(service)/api-provider";
import shdCnt from "../../(layout)/json/shared-content.json";
const q = "?fields=owner,subscriptionStatus,name,open,about,meta&populate=cover,ratings";

export default async function StoreLayout({ children, params: { storeId }, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  const accessToken = cookieStore.get("accessToken")?.value;

  // Todo: make the store query by id, title and about
  const store = await serverRequest("store", "GET", { query: `/${storeId}${q}`, token: accessToken })
    .then((res) => res.data)
    .catch(() => null);
  if (!store?.id) return notFound();
  const image = store.attributes?.cover?.data?.attributes?.url || "/img/market-store-grocery-cartoon.jpg";

  return (
    <>
      {!store.attributes ? (
        <EmptyState type="notFound" />
      ) : (
        <article>
          {/* sm:bg-gradient-to-tl from-dbg via-pc to-dbg */}
          <section className="overflow-hidden relative flex justify-center items-center -mx-1 sm:mx-0 h-44 sm:rounded-2xl">
            <Image
              priority
              src={image}
              width="1000"
              height="1000"
              alt={store.attributes.name}
              className="preview block w-full"
            />

            <h1 className="absolute w-full top-8 px-8 text-bg text-xl font-bold flex items-center t-shadow lazy-l">
              <span
                className={`inline-block w-6 h-6 bg-${
                  store.attributes.open ? "green" : "dt"
                } rounded-full`}></span>{" "}
              <span className="mx-2">{store.attributes.name}</span>
            </h1>
            <StoreLinks
              lang={lang}
              storeId={+storeId}
              name={store.attributes.name}
              about={store.attributes.about}
              ratings={store.attributes.ratings}
              phone={store.attributes.meta?.phone}
              scroll="175"
            />
          </section>

          <div className="mt-3 pb-6">
            <Tabs
              tabs={content.tabs.map(({ key, path, text }) => ({
                key,
                path: path.replace("storeId", store.id),
                text: text[lang],
              }))}
              cls="z-1 sticky top-14 bg-bg dark:bg-dbg shadow-none border-none"
            />
            <section className="min-h-[55vh]">{children}</section>
          </div>
        </article>
      )}
    </>
  );
}

const content = {
  tabs: [
    { key: "3", path: "/store/storeId/product", text: shdCnt.products },
    { key: "2", path: "/store/storeId/category", text: shdCnt.category },
    { key: "1", path: "/store/storeId", text: { en: "Overview", ar: "حول المتجر" } },
  ],
};
