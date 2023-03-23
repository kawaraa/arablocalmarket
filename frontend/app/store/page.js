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
        Found <strong>( 8 )</strong> stores
      </h1>

      <ul className="flex flex-wrap  mx-auto mb-16">
        <StoreCard
          Tag="li"
          link={"store/1/product"}
          name="Store name 1"
          imageUrl="/img/store-3.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="1.5 KM"
          ratings={{ stars: 3, total: 653 }}
          open={false}
        />
        <StoreCard
          Tag="li"
          link={"store/2/product"}
          name="Store name 2"
          imageUrl="/img/store-1.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="1 KM"
          ratings={{ stars: 3.5, total: 138 }}
          open={true}
        />
        <StoreCard
          Tag="li"
          link={"store/3/product"}
          name="Store name 3"
          imageUrl="/img/store-0.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="0.5 KM"
          ratings={{ stars: 1, total: 34 }}
          open={true}
        />
        <StoreCard
          Tag="li"
          link={"store/4/product"}
          name="Store name 4"
          imageUrl="/img/store-2.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="1.2 KM"
          ratings={{ stars: 4, total: 15 }}
          open={false}
        />
        <StoreCard
          Tag="li"
          link={"store/5/product"}
          name="Store name 5"
          imageUrl="/img/store-4.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="0.9 KM"
          ratings={{ stars: 3, total: 85 }}
          open={true}
        />
        <StoreCard
          Tag="li"
          link={"store/6/product"}
          name="Store name 6"
          imageUrl="/img/store-5.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="1 KM"
          ratings={{ stars: 3, total: 138 }}
          open={false}
        />
        <StoreCard
          Tag="li"
          link={"store/7/product"}
          name="Store name 7"
          imageUrl="/img/store-6.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="1.8 KM"
          ratings={{ stars: 3, total: 138 }}
          open={true}
        />
        <StoreCard
          Tag="li"
          link={"store/8/product"}
          name="Store name 8"
          imageUrl="/img/store-7.png"
          description="hef wfiuhfw ffpuhf wefwfpwuef wf"
          distance="0.3 KM"
          ratings={{ stars: 3, total: 138 }}
          open={false}
        />
      </ul>
    </>
  );
}

const content = {};
