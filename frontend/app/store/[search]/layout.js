import { cookies } from "next/headers";
import Image from "next/image";
import StoreLinks from "../(component)/store-links";
import Tabs from "../../(component)/(styled)/tabs";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Name / title - ALM" };

export default function StoreLayout({ children, params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  console.log("Store ID, Name or Title: ", params.search);

  let imageUrl = "/img/store-3.png";
  let id = 1;
  let open = true;
  let name = "Store name";

  return (
    <article>
      <section className="relative text-bg sm:h-[40vh] sm:bg-gradient-to-tl from-dbg via-pc to-dbg sm:rounded-2xl">
        <div className="overflow-hidden flex items-center sm:absolute sm:-bottom-10 sm:left-6 max-h-[40vh] w-full sm:w-40 rounded-2xl">
          <Image
            src={imageUrl}
            width="250"
            height="250"
            alt="Some description for the image"
            className="block w-full"
          />
          <div className="absolute inset-0 bg-blur sm:hidden rounded-2xl"></div>
        </div>
        <h1 className="absolute w-full top-8 px-8 text-xl font-bold flex items-center lazy-l">
          <span className={`inline-block w-6 h-6 bg-${open ? "green" : "dt"} rounded-full mr-2`}></span>{" "}
          {name}
        </h1>
        <StoreLinks />
      </section>

      <div className="mt-8 sm:mt-16 pb-6 border-b-2 border-bc">
        <Tabs
          tabs={content.tabs.map(({ key, path, text }) => ({
            key,
            path: path.replace("storeId", id),
            text: text[lang],
          }))}
          cls="sticky top-14 z-1 bg-bg dark:bg-dbg shadow-none border-none lazy-c"
        />
        <section className="">{children}</section>
      </div>
    </article>
  );
}

const content = {
  tabs: [
    { key: "1", path: "/store/storeId", text: { en: "Overview", ar: "نظرة عامة" } },
    { key: "2", path: "/store/storeId/category", text: { en: "Category", ar: "الفئات" } },
    { key: "3", path: "/store/storeId/product", text: { en: "Products", ar: "المنتجات" } },
  ],
};
