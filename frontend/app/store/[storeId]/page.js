import { cookies } from "next/headers";
import { extractLang } from "../../(service)/utilities";
import { serverRequest } from "../../(service)/api-provider";
import shdCnt from "../../(layout)/json/shared-content.json";
import LeafletMap from "../../(component)/leaflet-map";
import StarRating from "../../(component)/(styled)/rating";
const q =
  "?fields=owner,subscriptionStatus,deliver,deliveryCost,currency,name,about&populate=cover,openingHours,address,ratings";

export default async function StoreOverview({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = extractLang(params, searchParams, cookieStore.get("lang")?.value);

  const store = (await serverRequest("store", "GET", { query: `/${params.storeId}${q}` })).data?.attributes;
  if (!store) return notFound();

  const image = store.cover.data?.attributes?.url || "/img/market-store-grocery-cartoon.jpg";

  const formatTime = (time) => {
    const arr = time.split("-");
    return shdCnt.periods.find((p) => p.en == arr[0])[lang] + " " + arr[1];
  };

  const h2 = (text) => (
    <h2 dir="auto" className="text-lg mb-3 mt-5 font-medium">
      {text}
    </h2>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: store.name,
            image,
            description: store.about,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: store.ratings.stars,
              reviewCount: store.ratings.total,
            },
          }),
        }}
      />
      <div className="mx-1">
        <p dir="auto" className="flex items-center text-lg">
          <span className="">{content.delivery[lang][0]}:</span>
          <strong className="mx-2">
            {store.deliver ? store.currency.split("-")[0] + store.deliveryCost : content.delivery[lang][1]}
          </strong>
        </p>

        {h2(content.about[lang])}
        <p>{store.about}</p>

        {h2(content.openHrs[lang])}
        <ul dir="auto" className="flex flex-col md:flex-row md:flex-wrap">
          {store.openingHours.map((item, i) => (
            <li className="flex my-2 min-w-[50%]" key={i}>
              <span className="min-w-[100px] capitalize">
                {shdCnt.day.values.find((d) => d.en == item.day)[lang]}
              </span>
              <strong className="flex-9">
                {formatTime(item.opens)}
                <span className="mx-4">-</span>
                {formatTime(item.closes)}
              </strong>
            </li>
          ))}
        </ul>

        <address dir="ltr">
          {h2(content.adr[lang])}
          <p>
            {store.address.line1} {store.address.line2 || ""}
            <br /> {store.address.city} {store.address.postalCode}
            <br />
            {store.address.province} {store.address.country}
          </p>
        </address>

        <a
          href={
            "http://maps.google.com/?q=" +
            (store.address.currentLat
              ? `${store.address.currentLat},${store.address.currentLng}`
              : `${store.address.line1},${store.address.line2 || ""},${store.address.postalCode},${
                  store.address.city
                },${store.address.country}`)
          }
          rel="noreferrer"
          target="_blank"
          className="black w-full">
          <LeafletMap lang={lang} coordinates={[store.address.currentLat, store.address.currentLng]} />
        </a>

        <div dir="ltr" className="relative text-center mt-7">
          <StarRating stars={store.ratings.stars} cls="text-blur text-3xl" />
          {store.ratings.total > 0 && <span className="text-xl mx-1 ">{store.ratings.total}</span>}
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }) {
  const store = await serverRequest("store", "GET", { query: `/${params.storeId}${q}` })
    .then((res) => res.data?.attributes)
    .catch(() => null);
  if (!store) return {};
  return { title: store.name + " - ALM", description: store.about };
}

const content = {
  delivery: { en: ["Delivery", "Free"], ar: ["توصيل", "لا يوجد"] },
  openHrs: { en: "Opening hours", ar: "ساعات العمل" },
  about: { en: "About", ar: "حول المتجر" },
  adr: { en: "Location", ar: "موقع المتجر" },
};
