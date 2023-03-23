import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default function StoreCategories({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  const store = { id: 1, categories };

  return (
    <>
      <h2 className="text-lg mb-3 ml-2 font-medium">{content.h2[lang]}</h2>

      <ul className="flex flex-wrap">
        {store.categories.map((c, i) => (
          <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c" key={i}>
            <Link
              href={`/store/${store.id}/product?category=${c.text.en.replace(/\s/gim, "")}`}
              className="relative block w-full h-full p-2 pt-3 bg-cbg card cd_hr rounded-xl duration-200">
              <span className="absolute top-2 right-2">{c.numberOfItems}</span>
              <div className="overflow-hidden h-16 flex justify-center items-center">
                <Image src={c.image} alt={c.text[lang]} width="250" height="250" className="h-full w-auto" />
              </div>
              <h3 className="text-sm text-center mt-2">{c.text[lang]}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const content = {
  h2: { en: "Categories", ar: "الفئات" },
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
