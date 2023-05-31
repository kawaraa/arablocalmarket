import { headers, cookies } from "next/headers";
import { Distance } from "k-utilities";
import EmptyState from "../(component)/(styled)/empty-state";
import { serverRequest } from "../(service)/api-provider";
import StoreCard from "./store-card";
import StoreSearch from "./store-search";
import PaginationButtons from "./[storeId]/product/pagination-buttons";
import CoordinatesCriteria from "./coordinates-criteria";

export default async function StoresNearby({ searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  const coordinates = cookieStore.get("coordinates")?.value?.split(":") || [0, 0];
  const range = +(cookieStore.get("range")?.value || "1.5");
  const search = searchParams.search?.toLowerCase();
  const page = searchParams.page || 1;

  // This for detecting the user location via the IP Address
  // const headersList = headers();
  // if (coordinates[0] == 0) {
  //   const userGeo = await getGeoInfo(headersList.get("x-forwarded-for"));
  //   if (userGeo?.latitude) coordinates = [userGeo.latitude, userGeo.longitude];
  // }

  const criteria = new CoordinatesCriteria(...coordinates, range);
  const { data, meta } = await getData(page, criteria, search);
  data.forEach((store) => {
    store.distance = new Distance(...coordinates, store.address.currentLat, store.address.currentLng, "km");
  });

  return (
    <>
      <StoreSearch text={search} />

      <h1 className="mb-4 text-center">
        {content.h1[lang][0]} <strong>( {meta.pagination.total} )</strong> {content.h1[lang][1]}
      </h1>

      {!data[0] ? (
        <div className="h-[60vh] flex items-center">
          <EmptyState lang={lang} type="noStore" />
        </div>
      ) : (
        <ul className="flex flex-wrap  mx-auto mb-16">
          {data.map((store, i) => (
            <StoreCard
              Tag="li"
              lang={lang}
              link={`/store/${store.id}/product`}
              name={store.name}
              imageUrl={store.cover.data?.attributes?.url || "/img/market-store-grocery-cartoon.jpg"}
              about={store.about}
              distance={store.distance}
              ratings={store.ratings}
              open={store.open}
              key={i}
            />
          ))}
        </ul>
      )}

      <PaginationButtons lang={lang} query={searchParams} pagination={meta.pagination} />
    </>
  );
}

export async function generateMetadata({ params, searchParams }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  return {
    title: content.title[lang] + " - ALM",
    description: content.desc[lang],
  };
}

async function getData(page, criteria, search) {
  // Todo: includes in the filters the following: open, payments, deliver, deliveryCost, whatsAppOrder
  const { range, lat, lng, minLat, maxLat, minLng, maxLng } = criteria;

  let sq = "";
  if (search) {
    sq = `filters[$or][0][name][$contains]=${search}&filters[$or][1][about][$contains]=${search}&`;
  }

  let query = `?${sq}populate[cover]=*&populate[ratings]=*&populate[address]=*&pagination[page]=${page}&pagination[pageSize]=50`;

  if (lat != 0 && lng != 0) {
    query = `?filters[$and][0][address][currentLat][$gte]=${minLat}&filters[$and][1][address][currentLat][$lte]=${maxLat}&filters[$and][2][address][currentLng][$gte]=${minLng}&filters[$and][3][address][currentLng][$lte]=${maxLng}&${sq}&populate[cover]=*&populate[ratings]=*&populate[address]=*&pagination[page]=${page}&pagination[pageSize]=50`;
  }
  return serverRequest("store", "GET", { query });
}

// function getGeoInfo(ip) {
//   // `https://get.geojs.io/v1/ip/geo/${ip}.json` Or ` https://ip-api.com/json/${ip}`
//   return serverRequest(`https://get.geojs.io/v1/ip/geo/${ip}.json`).catch(() => null);
// }

const content = {
  title: { en: "Stores nearby", ar: "المتاجر القريبة" },
  desc: {
    en: "Arab Local Market, List of the stores within the selected range of location",
    ar: "السوق المحلي، العربي قائمة المخازن ضمن النطاق المحدد من الموقع",
  },
  h1: { en: ["Found", "Stores"], ar: ["يوجد", "مخزن"] },
};
