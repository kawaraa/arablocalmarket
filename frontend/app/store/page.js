import { headers, cookies } from "next/headers";
import EmptyState from "../(component)/(styled)/empty-state";
import { serverRequest } from "../(service)/api-provider";
// import Link from "next/link";
// import Rating from "../(component)/(styled)/rating";
import StoreCard from "./(component)/store-card";
import StoreSearch from "./(component)/store-search";
const q = "?populate[cover]=*&populate[ratings]=*";

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Stores Nearby - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

export default async function StoresNearby({ searchParams }) {
  const headersList = headers();
  // const ip = headersList.get("ip-address");
  const ip = headersList.get("x-forwarded-for");

  console.log(ip);

  const cookieStore = cookies();
  // const lang = cookieStore.get("lang")?.value || searchParams?.lang || "en";
  const coordinates = cookieStore.get("coordinates")?.value?.split(":") || [0, 0];
  const range = cookieStore.get("range")?.value || "0.5";
  const { search } = searchParams;

  console.log("Show result based on this: >>> ", coordinates, range, search);

  let { data, meta } = await serverRequest("store", "GET", { query: q }).catch(() => []);
  if (coordinates[0] != 0) {
    // data = data.filter(store=>store)
  }

  // Todo: if no stores found, then show empty stat page E.g.
  // <h4>Could not find stores near you!</h4>
  // <p>Please make sure your location is active, otherwise you can choose the your location manually.</p>

  return (
    <>
      <StoreSearch text={searchParams?.search} coordinates={coordinates} />

      <h1 className="mb-4 text-center">
        Found <strong>( {data.length} )</strong> stores
      </h1>
      <div>IP: {ip}</div>
      {!data[0] ? (
        <div className="h-[70vh] flex items-center">
          <EmptyState type="noStore" />
        </div>
      ) : (
        <ul className="flex flex-wrap  mx-auto mb-16">
          {data.map((store, i) => (
            <StoreCard
              Tag="li"
              link={`/store/${store.id}/product`}
              name={store.attributes.name}
              imageUrl={store.attributes.cover.data.attributes.url}
              description={store.attributes.about}
              distance="1.5 KM"
              ratings={store.attributes.ratings}
              open={store.attributes.open}
              key={i}
            />
          ))}
        </ul>
      )}

      {coordinates[0] == 0}
    </>
  );
}

const content = {};
