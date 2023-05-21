import { cookies } from "next/headers";
import { serverRequest } from "../../(service)/api-provider";
import shdCnt from "../../(layout)/json/shared-content.json";
import LeafletMap from "../../(component)/leaflet-map";
const q = "?fields=owner,deliver,deliveryCost,currency,about&populate=openingHours,address";

export default async function StoreOverview({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";

  // Todo: make the store query by id, title and about
  const store = (await serverRequest("store", "GET", { query: `/${params.storeId}${q}` })).data?.attributes;
  if (!store) return notFound();

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
      <p dir="auto" className="flex items-center text-lg">
        <span className="">{content.delivery[lang][0]}:</span>
        <strong className="mx-2">
          {store.deliver ? store.currency.split("-")[0] + store.deliveryCost : content.delivery[lang][1]}
        </strong>
      </p>

      {h2(content.about[lang])}
      <p>{store.about}</p>

      {h2(content.openHrs[lang])}
      <ul dir="auto">
        {store.openingHours.map((item, i) => (
          <li className="" key={i}>
            <p className="w-24 mb-2 mt-5 capitalize">
              {shdCnt.day.values.find((d) => d.en == item.day)[lang]}
            </p>
            <div className="flex">
              <span className="flex" dir="auto">
                {shdCnt.open[lang]}
                <span className="w-2"></span>
                {formatTime(item.opens)}
              </span>
              <span className="mx-4">-</span>
              <span className="flex" dir="auto">
                {shdCnt.close[lang]}
                <span className="w-2"></span>
                {formatTime(item.closes)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {h2(content.adr[lang])}
      <p>
        {store.address.line1} {store.address.line2}
        <br /> {store.address.city} {store.address.postalCode}
        <br />
        {store.address.province} {store.address.country}
      </p>
      <LeafletMap lang={lang} coordinates={[store.address.currentLat, store.address.currentLng]} />
    </>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const store = await serverRequest("store", "GET", { query: `/${params.storeId}${q}` })
    .then((res) => res.data?.attributes)
    .catch(() => null);
  if (!store) return {};
  return { title: store.name + " - ALM", description: store.about };
}

const content = {
  delivery: { en: ["Delivery", "NO"], ar: ["توصيل", "لا يوجد"] },
  openHrs: { en: "Opening hours", ar: "ساعات العمل" },
  about: { en: "About", ar: "حول المتجر" },
  adr: { en: "Location", ar: "موقع المتجر" },
};
