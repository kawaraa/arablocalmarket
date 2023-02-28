import { headers, cookies } from "next/headers";
import Link from "next/link";
import StarRating from "../(component)/(styled)/start-rating";
import Store from "../(component)/store";
import StoreSearch from "../(component)/store-search";
// import ContextMenu from "../(component)/context-menu";

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Stores Nearby - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

export default function StoresNearby(p) {
  // const headersList = headers();
  // const en = headersList.get('en');
  // const id = headersList.get('ip-address');
  // const coordinates = headersList.get('coordinates');
  // console.log(headersList);

  const cookieStore = cookies();
  const coordinates = cookieStore.get("coordinates")?.value?.split(":") || [0, 0];
  const range = cookieStore.get("range")?.value || "0.5";

  console.log(coordinates, "Range: ", range, "search: ", p.searchParams?.search);

  return (
    <>
      <StoreSearch coordinates={coordinates} />

      <h1>Hello from stores nearby page!</h1>
      <div>
        <h4>Could not find stores near you!</h4>
        <p>Please make sure your location is active, otherwise you can choose the your location manually.</p>
        {/* <p className="text-md text-center">
            Todo: Turn on the location Or Select your area. list of country where the user can select the
            country, the province, the city, the neighborhood and maybe the street
          </p> */}
      </div>

      <p>Here show all the stores that near you.</p>
      <div className="flex flex-wrap">
        <Store imageUrl="/img/store-0.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-1.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-2.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-3.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-4.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-5.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-6.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-7.png" name="Store name 1" distance="1.5" />
        <Store imageUrl="/img/store-8.png" name="Store name 1" distance="1.5" />
      </div>

      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
          order.
        </p>
      </a>
    </>
  );
}
