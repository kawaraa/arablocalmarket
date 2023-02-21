import { headers } from "next/headers";
import Store from "../(component)/store";

// import Button from "./(component)/(styled)/button";
// import Dropdown from "../(component)/(styled)/dropdown";
// import Select from "../(component)/select";
// import SelectList from "../(component)/select-list";
// import Switch from "../(component)/switch";
// import Breadcrumb from "../(component)/breadcrumb";
import Card from "../(component)/card";
import icons from "../(component)/(styled)/icons";
// import ContextMenu from "../(component)/context-menu";

// Todo: For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Stores Nearby - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

export default function StoresNearby() {
  const headersList = headers();
  // const referer = headersList.get('referer');
  // console.log(headersList);

  return (
    <>
      <form className="relative w-full mt-3 mb-5 flex justify-end">
        <label htmlFor="store-search" className="absolute top-1.5 right-1 w-5 text-black ">
          {icons.search}
        </label>
        <input
          type="text"
          id="store-search"
          placeholder="Search for a store"
          className="flex-auto p-1 pl-3 pr-8 text-md bg-[transparent] rounded-lg focus:outline-none border border-d-b focus:shadow-lg"
          tabIndex="0"
        />
      </form>

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
