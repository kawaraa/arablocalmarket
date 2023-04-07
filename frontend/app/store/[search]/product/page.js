import { cookies } from "next/headers";
import Link from "next/link";
import ProductSearch from "../../../(component)/product-search";
import ProductCard from "../../../(component)/product-card";
import { serverRequest } from "../../../(service)/api-provider";
import Image from "next/image";
const q = "?fields=currency";
const q1 =
  "?fields=id,storeId,name,category&populate[image]=*&populate[ratings]=*&populate[variants][fields]=price";
const catchErr = () => ({ data: [], meta: {} });

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Nprice:12,ame / title products - ALM" };

export default async function ProductsByStore({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  const storeId = params.search;
  const category = searchParams.tab == "category";

  // console.log("Show products based on this: >>> ", searchParams);
  // Todo: make the store query by id, title and about
  const res = await serverRequest("store", "GET", { query: `/${params.search}${q}` }).catch(() => null);
  const currency = res?.data?.attributes.currency.split("-");
  const { data, meta } = await serverRequest("product", "GET", { query: q1 }).catch(catchErr);
  // let result = data;

  return (
    <div>
      {/* Todo: make this search on type */}
      <ProductSearch text={searchParams.search} scroll="180" />

      {category ? (
        <>
          <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
            {content.category[lang]}
          </h2>

          <ul className="flex flex-wrap">
            {categories.map((c, i) => (
              <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c" key={i}>
                <Link
                  href={`/store/${storeId}/product?category=${c.text.key}`}
                  className="relative block w-full h-full p-2 pt-3 bg-cbg card cd_hr rounded-xl duration-200">
                  <span className="absolute top-2 right-2">
                    {data.filter((p) => p.attributes.category == c.key).length}
                  </span>
                  <div className="overflow-hidden h-16 flex justify-center items-center">
                    <Image
                      src={c.image}
                      alt={c.text[lang]}
                      width="250"
                      height="250"
                      className="h-full w-auto"
                    />
                  </div>
                  <h3 className="text-sm text-center mt-2">{c.text[lang]}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 dir="auto" className="text-lg mb-3 font-medium lazy-l">
            {content.product[lang][0]}
            <span className="font-bold">( 9 )</span> {content.product[lang][1]}
          </h2>
          <ul className="flex flex-wrap">
            {data.map((p, i) => (
              <ProductCard
                lang={lang}
                currency={currency[0]}
                p={p.attributes}
                id={p.id}
                link={`/store/${storeId}/product/${p.id}`}
                key={i}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const content = {
  product: { en: ["Found", "Products"], ar: ["يوجد", "منتج"] },
  category: { en: "Categories", ar: "الفئات" },
};

const categories = [
  {
    text: { en: "Vegetables and fruits", ar: "الخضروات والفواكه" },
    key: "vegetable",
    image: "/produce-vegetables-clipart.png",
    numberOfItems: 1,
  },
  { text: { en: "Bakery", ar: "مخبوزات" }, key: "bakery", image: "/bread-clipart.png", numberOfItems: 10 },
  {
    text: { en: "Meat and poultry", ar: "لحم و دواجن" },
    key: "meat",
    image: "/cut-of-meat-clipart.png",
    numberOfItems: 13,
  },
  {
    text: { en: "Seafood", ar: "مأكولات بحرية" },
    key: "seafood",
    image: "/fish-clipart.png",
    numberOfItems: 11,
  },
  {
    text: { en: "Deli", ar: "الأطعمة" },
    key: "deli",
    image: "/burger-prepared-food-clipart.png",
    numberOfItems: 3,
  },
  {
    text: { en: "Dairy and eggs", ar: "الألبان والبيض" },
    key: "dairy",
    image: "/dairy-clipart.png",
    numberOfItems: 31,
  },
  //text:{ { name: "Frozen foods"}, image: "", numberOfItems: 1031 },
  {
    text: { en: "Beverages", ar: "المشروبات" },
    key: "beverages",
    image: "/beverages-clipart.png",
    numberOfItems: 52,
  },
  {
    text: { en: "Snacks and candy", ar: "الوجبات الخفيفة والحلوى" },
    key: "snack",
    image: "/snacks-clipart.png",
    numberOfItems: 86,
  },
  {
    text: { en: "Canned and packaged goods", ar: "البضائع المعلبة والمعبأة" },
    key: "canned",
    image: "/canned-goods-clipart.png",
    numberOfItems: 25,
  },
  {
    text: {
      en: "Legumes and grains",
      ar: "الحبوب والبقوليات",
    },
    key: "legumes",
    image: "/legumes-grains-clipart.png",
    numberOfItems: 1031,
  },
  {
    text: {
      en: "Nuts and seeds",
      ar: "المكسرات والبذور",
    },
    key: "seeds",
    image: "/nuts-seeds-clipart.png",
    numberOfItems: 1031,
  },
  {
    text: { en: "Spices and sauces", ar: "البهارات والصلصات" },
    key: "spices",
    image: "/condiments-sauces-spices-clipart.png",
    numberOfItems: 45,
  },
  {
    text: { en: "Cleaning supplies", ar: "معدات تنظيف" },
    key: "cleaning",
    image: "/cleaning-supplies-clipart.png",
    numberOfItems: 32,
  },
  {
    text: { en: "Care products", ar: "منتجات العناية" },
    key: "care",
    image: "/care-products-clipart.png",
    numberOfItems: 24,
  },
  // {text:{ name: "Health - wellness products"}, image: "", numberOfItems: 1031 },
  {
    text: { en: "Baby supplies", ar: "مستلزمات الأطفال" },
    key: "baby",
    image: "/baby-food-clipart.png",
    numberOfItems: 35,
  },
  // {text:{ name: "Office - school supplies"}, image: "", numberOfItems: 1031 },
  // {text:{ name: "Electronics"}, image: "", numberOfItems: 1031 },
  // {text:{ name: "Home - kitchen supplies"}, image: "", numberOfItems: 1031 },
  // {text:{ name: "Seasonal items"}, image: "", numberOfItems: 1031 },
];
