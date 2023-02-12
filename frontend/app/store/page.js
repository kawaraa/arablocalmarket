import { headers } from "next/headers";
import Store from "./store";

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
    <div>
      <h1>Hello from stores nearby page!</h1>
      <div>
        <h4>Could not find stores near you!</h4>
        <p>Please make sure your location is active, otherwise you can choose the your location manually.</p>
      </div>

      <p>Here show all the stores that near you.</p>
      <div className="flex">
        <Store />
        <Store />
        <Store />
        <Store />
        <Store />
      </div>
    </div>
  );
}
