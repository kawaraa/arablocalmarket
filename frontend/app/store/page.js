import { headers, cookies } from "next/headers";
// import Link from "next/link";
// import Rating from "../(component)/(styled)/rating";
import StoreCard from "./(component)/store-card";
import StoreSearch from "./(component)/store-search";
// import ContextMenu from "../(component)/context-menu";

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Stores Nearby - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

export default async function StoresNearby({ searchParams }) {
  // const headersList = headers();
  // const en = headersList.get('en');
  // const id = headersList.get('ip-address');
  // const coordinates = headersList.get('coordinates');
  // console.log(headersList);

  const cookieStore = cookies();
  const coordinates = cookieStore.get("coordinates")?.value?.split(":") || [0, 0];
  const range = cookieStore.get("range")?.value || "0.5";

  console.log("Show result based on this: >>> ", coordinates, range, searchParams?.search);

  // const stores = await fetch("https://dummyjson.com/products")
  //   .then((res) => res.json())
  //   .then((d) => d.products);

  // Todo: if no stores found, then show empty stat page E.g.
  // <h4>Could not find stores near you!</h4>
  // <p>Please make sure your location is active, otherwise you can choose the your location manually.</p>

  return (
    <>
      <StoreSearch text={searchParams?.search} coordinates={coordinates} />

      <h1 className="mb-4 text-center">
        Found <strong>( 5 )</strong> stores
      </h1>

      <div className="flex flex-wrap max-w-[1400px] mx-auto mb-16">
        <StoreCard imageUrl="/img/store-3.png" name="Store name 1" distance="1.5" open={false} />
        <StoreCard imageUrl="/img/store-1.png" name="Store name 1" distance="1.5" open={true} />
        <StoreCard imageUrl="/img/store-0.png" name="Store name 1" distance="1.5" open={true} />
        <StoreCard imageUrl="/img/store-2.png" name="Store name 1" distance="1.5" open={false} />
        <StoreCard imageUrl="/img/store-4.png" name="Store name 1" distance="1.5" open={true} />
        <StoreCard imageUrl="/img/store-5.png" name="Store name 1" distance="1.5" open={false} />
        <StoreCard imageUrl="/img/store-6.png" name="Store name 1" distance="1.5" open={true} />
        <StoreCard imageUrl="/img/store-7.png" name="Store name 1" distance="1.5" open={false} />
      </div>
    </>
  );
}

const content = {};
