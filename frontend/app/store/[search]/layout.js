import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import StoreLinks from "../(component)/store-links";
import EmptyState from "../../(component)/(styled)/empty-state";
import Tabs from "../../(component)/(styled)/tabs";
import { serverRequest } from "../../(service)/api-provider";
import shdCnt from "../../(layout)/json/shared-content.json";
const q = "?fields=owner,name,open,about,meta&populate=cover,ratings";
const catchErr = () => ({ data: {}, meta: {} });

// Todo: NextJS is duplicated the titles
// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
// export const metadata = { title: "Store Name / title - ALM" };

export const revalidate = 60;
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function StoreLayout({ children, params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  // Todo: make the store query by id, title and about
  const cacheConf = { cache: "no-store", next: { revalidate: 0 } };
  const res = await serverRequest("store", "GET", { query: `/${params.search}${q}` }, null, cacheConf).catch(
    catchErr
  );
  if (!res?.data?.attributes) return notFound();
  const store = res.data.attributes;
  store.id = res.data.id;
  const image = store?.cover?.data?.attributes?.url || "/img/market-store-grocery-cartoon.jpg";

  return (
    <>
      {!store ? (
        <EmptyState type="notFound" />
      ) : (
        <article>
          {/* sm:bg-gradient-to-tl from-dbg via-pc to-dbg */}
          <section className="overflow-hidden relative flex justify-center items-center -mx-1 sm:mx-0 h-44 sm:rounded-2xl">
            <Image
              priority
              src={image}
              width="600"
              height="600"
              alt={store.name}
              className="preview block w-full"
            />

            <h1 className="absolute w-full top-8 px-8 text-bg text-xl font-bold flex items-center t-shadow lazy-l">
              <span className={`inline-block w-6 h-6 bg-${store.open ? "green" : "dt"} rounded-full`}></span>{" "}
              <span className="mx-2">{store.name}</span>
            </h1>
            <StoreLinks
              lang={lang}
              name={store.name}
              about={store.about}
              ratings={store.ratings}
              phone={store.meta.phone}
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
    { key: "1", path: "/store/storeId", text: { en: "Overview", ar: "نظرة عامة" } },
  ],
};
