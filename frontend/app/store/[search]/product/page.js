// import { headers } from "next/headers";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Store Name / title products - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

// http://localhost:3000/store/1/product
// http://localhost:3000/store/1/product
// http://localhost:3000/store/1/product

export default function ProductsByStore({ params, searchParams }) {
  // const headersList = headers();
  // const referer = headersList.get('referer');
  // console.log(headersList);

  return (
    <div>
      <h1>Public Store Products page!</h1>
      <p>Here will show Products by store.</p>
      <p>Category and All products tabs</p>
      <p>Sort products by created date, updated date, price, quantity, category.</p>
    </div>
  );
}
