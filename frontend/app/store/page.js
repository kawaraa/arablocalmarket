import { headers, cookies } from "next/headers";
import { Distance } from "k-utilities";
import EmptyState from "../(component)/(styled)/empty-state";
import { serverRequest } from "../(service)/api-provider";
import StoreCard from "./(component)/store-card";
import StoreSearch from "./(component)/store-search";
const q = "?populate[cover]=*&populate[ratings]=*&populate[address]=*";
const catchErr = () => ({ data: [], meta: {} });

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Stores Nearby - ALM" };

export default async function StoresNearby({ searchParams }) {
  // const headersList = headers();
  // const ip = headersList.get("ip-address");
  // const ip = headersList.get("x-forwarded-for");
  // const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  // console.log(ip);

  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  const coordinates = cookieStore.get("coordinates")?.value?.split(":") || [0, 0];
  const range = +(cookieStore.get("range")?.value || "0.5");
  const search = searchParams.search?.toLowerCase();

  let { data, meta } = await serverRequest("store", "GET", { query: q }).catch(catchErr);

  // This should be done int backend, the same as here: letsdohobby/app/server/src/domain/model/search-criteria.js
  data = data.filter((store) => {
    store.distance = new Distance(
      coordinates[0],
      coordinates[1],
      store.address.currentLat,
      store.address.currentLng,
      "km"
    );

    return true;
    // return (
    //   coordinates[0] == 0 ||
    //   (store.distance <= range &&
    //     (!search ? true : store.name.includes(search || store.description?.includes(search))))
    // );
  });

  // <h4>Could not find stores near you!</h4>
  // <p>Please make sure your location is active, otherwise you can choose the your location manually.</p>
  return (
    <>
      <StoreSearch text={searchParams?.search} coordinates={coordinates} />

      <h1 className="mb-4 text-center">
        {content.h1[lang][0]} <strong>( {data.length} )</strong> {content.h1[lang][1]}
      </h1>
      {/* <div>IP: {ip}</div> */}
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
              imageUrl={store.cover.data.attributes.url}
              about={store.about}
              distance={store.distance}
              ratings={store.ratings}
              open={store.open}
              key={i}
            />
          ))}
        </ul>
      )}
    </>
  );
}

const content = {
  h1: { en: ["Found", "Stores"], ar: ["يوجد", "مخزن"] },
};
