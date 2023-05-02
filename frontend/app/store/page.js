import { headers, cookies } from "next/headers";
import { Distance } from "k-utilities";
import EmptyState from "../(component)/(styled)/empty-state";
import { serverRequest } from "../(service)/api-provider";
import StoreCard from "./(component)/store-card";
import StoreSearch from "./(component)/store-search";
import PaginationButtons from "./[search]/product/(component)/pagination-buttons";
import CoordinatesCriteria from "./(component)/coordinates-criteria";

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
// export const metadata = { title: "Stores Nearby - ALM" };

export default async function StoresNearby({ searchParams }) {
  // const headersList = headers();

  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  let coordinates = cookieStore.get("coordinates")?.value?.split(":") || [0, 0];
  const range = +(cookieStore.get("range")?.value || "1.5");
  const search = searchParams.search?.toLowerCase();
  const page = searchParams.page || 1;

  // This is not needed if reloading the page in this file: app/store/(component)/store-search.js
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
      <StoreSearch text={search} userLocation={coordinates} />

      <h1 className="mb-4 text-center">
        {content.h1[lang][0]} <strong>( {meta.pagination.total} )</strong> {content.h1[lang][1]}
      </h1>

      {!data[0] ? (
        <div className="h-[60vh] flex items-center">
          <EmptyState type="noStore" />
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

async function getData(page, criteria, search) {
  // Todo: includes in the filters the following: open, payments, deliver, deliveryCost, whatsAppOrder
  const { range, minLat, maxLat, minLng, maxLng } = criteria;

  let sq = "";
  if (search) {
    sq = `filters[$or][0][name][$contains]=${search}&filters[$or][1][about][$contains]=${search}&`;
  }

  // Todo: Remove this query
  const query = `?${sq}populate[cover]=*&populate[ratings]=*&populate[address]=*&pagination[page]=${page}&pagination[pageSize]=50`;

  // Todo: Use this query instead, it's tested
  // const query = `?filters[$and][0][address][currentLat][$gte]=${minLat}&filters[$and][1][address][currentLat][$lte]=${maxLat}&filters[$and][2][address][currentLng][$gte]=${minLng}&filters[$and][3][address][currentLng][$lte]=${maxLng}${sq}&populate[cover]=*&populate[ratings]=*&populate[address]=*&pagination[page]=${page}&pagination[pageSize]=50`;

  const catchErr = () => ({ data: [], meta: { pagination: { page: 1, total: 0 } } });
  return serverRequest("store", "GET", { query }).catch(catchErr);
}

// function getGeoInfo(ip) {
//   // `https://get.geojs.io/v1/ip/geo/${ip}.json` Or ` https://ip-api.com/json/${ip}`
//   return serverRequest(`https://get.geojs.io/v1/ip/geo/${ip}.json`).catch(() => null);
// }

const content = {
  h1: { en: ["Found", "Stores"], ar: ["يوجد", "مخزن"] },
};
