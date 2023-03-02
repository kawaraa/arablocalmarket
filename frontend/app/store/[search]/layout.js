import { headers } from "next/headers";
// import Script from "next/script";
// import { Inter } from "next/font/google";
import Image from "next/image";
import SvgIcon from "../../(component)/(styled)/svg-icon";
import StoreLinks from "../../(component)/store-links";
import StarRating from "../../(component)/(styled)/start-rating";

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
  // Share: onClick={() => navigator.share(window.location.href)}
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share

  return (
    <article>
      {/* <Script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></Script> */}

      <section className="relative w-ful h-40 sm:h-48 md:h-40 text-bg">
        <Image
          src={imageUrl}
          width="250"
          height="250"
          alt="Some description for the image"
          className="block w-full h-full"
        />
        <div className="absolute inset-0 bg-blur"></div>
        <h1 className="absolute bottom-10 text-xl font-bold mx-3">Store Name</h1>
        <StoreLinks />
      </section>

      <section className="mt-6 pb-6 border-b-2 border-bc">
        <div className="text-center">
          <StarRating rating={0} />
        </div>
        <h2 className="text-lg mb-3">Description</h2>

        <p>About: Hello from public store by ID page!, Here will show the store by ID to the public.</p>
      </section>

      <p>Open / Closed.</p>
      <p>About</p>
      <p>Products</p>
      {children}
    </article>
  );
}
