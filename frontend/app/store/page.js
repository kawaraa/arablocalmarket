import { headers } from "next/headers";
import Link from "next/link";
import Store from "../(component)/store";

import Button from "../(component)/(styled)/button";
// import Dropdown from "../(component)/(styled)/dropdown";
// import Select from "../(component)/select";
// import SelectList from "../(component)/select-list";
// import Switch from "../(component)/switch";
// import Breadcrumb from "../(component)/breadcrumb";
import Card from "../(component)/card";
import icons from "../(component)/(styled)/icons";
import StoreSearch from "../(component)/store-search";
// import ContextMenu from "../(component)/context-menu";

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Stores Nearby - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

export default function StoresNearby() {
  const headersList = headers();
  // const en = headersList.get('en');
  // const id = headersList.get('ip-address');
  // const coordinates = headersList.get('coordinates');
  // console.log(headersList);

  return (
    <>
      <StoreSearch coordinates={[41.0247, 28.9252]} />

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
      <div className="flex min-h-[100vh]">
        <Store />
        <Store />
        <Store />
        <Store />
        <Store />
      </div>
    </>
  );
}
