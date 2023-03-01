import { headers } from "next/headers";
import Image from "next/image";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Name / title - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

// http://localhost:3000/store/1
// http://localhost:3000/store/market-alsaaid
// http://localhost:3000/store/store-title

export default function StoreBySearch({ children, params, searchParams }) {
  const headersList = headers();
  // const referer = headersList.get('referer');
  // console.log(headersList);
  let imageUrl = "/img/store-1.png";

  console.log("Store ID, Name or Title: ", params.search);

  return (
    <article>
      <section className="relative w-ful h-40 sm:h-48 md:h-40 ">
        <Image
          src={imageUrl}
          width="250"
          height="250"
          alt="Some description for the image"
          className="block w-full h-full"
        />
        <div className="absolute inset-0 bg-blur"></div>
        <h1 className="absolute bottom-6 text-xl font-bold text-bg mx-6">Store Name</h1>
      </section>

      <h1>Hello from public store by ID page!</h1>
      <p>Here will show the store by ID to the public.</p>

      <p>Open / Closed.</p>
      <p>About</p>
      <p>Products</p>
      {children}
    </article>
  );
}
