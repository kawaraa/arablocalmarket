// import { headers } from "next/headers";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Product Name / title - store name - ALM" };

// Todo: Change the description language based on the IP address.
// Todo: If it's possible, change the html lang based on the IP address.
// Todo: If it's possible, change the html className based on the IP address.
// Todo: Let the user select his location manually and save it if the location is inactive.

// http://localhost:3000/store/1/product/1
// http://localhost:3000/store/1/product/barcode // UPC/IAN/EAN
// http://localhost:3000/store/1/product/product-name
// http://localhost:3000/store/1/product/product-title

export default function ProductBySlug({ params, searchParams }) {
  // const headersList = headers();
  // const referer = headersList.get('referer');
  // console.log(headersList);

  // You cannot have the same slug name "slug" repeat within a single dynamic path

  console.log("Product ID, Name or title: ", params.slug);

  return (
    <div>
      <h1>Public store Product page!</h1>
      <p>Here will show a single product for a store to the public.</p>
    </div>
  );
}
