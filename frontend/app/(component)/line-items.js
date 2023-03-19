"use client";
import Image from "next/image";
import Link from "next/link";

export default function LineItems({ items }) {
  // console.log("AAA: >>>", a);

  return (
    <ul className="mt-4 mb-1 space-y-3">
      {items.map((item) => (
        <li className="flex">
          <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
            <Image
              src={item.image}
              alt={"Product title goes here"}
              width="150"
              height="150"
              className="w-full"
            />
          </div>
          <div className="relative w-full mx-2">
            <Link href="/store/1/product/1" className="block mb-1 text-sm hover:text-pc2">
              {item.title}
            </Link>

            <p className="flex justify-between w-full text-sm text-red font-medium ">
              {item.discount && (
                <span className="mr-2 line-through">
                  {item.currency}
                  {item.discount + item.price}
                </span>
              )}
              {item.price} <span className="text-t dark:text-dt font-bold">{item.quantity}</span>
            </p>
          </div>
        </li>
      ))}

      <li className="flex">
        <div className="overflow-hidden w-14 max-h-14 flex items-center rounded-md">
          <Image
            src="/bread-clipart.png"
            alt={"Product title goes here"}
            width="150"
            height="150"
            className="w-full"
          />
        </div>
        <div className="relative w-full mx-2">
          <Link href="/store/1/product/1" className="block text-sm hover:text-pc2">
            Product title + the variant title goes here
          </Link>

          <p className="flex justify-between w-full text-sm text-red font-medium ">
            €10.50 <span className="text-t dark:text-dt font-bold">2</span>
          </p>
        </div>
      </li>
    </ul>
  );
}

{
  /* Todo: Move this to customer dashboard component */
  /* <div className="relative overflow-hidden h-32 flex justify-center mt-24 mx-3 rounded-[30px] bg-pc1 pointer lazy-c">
          <span className="absolute top-5 left-5">Shopping list</span>
          <img src="/img/1.png" className="absolute top-0 right-0 h-full" />
        </div> */
}
{
  /* <div className="h-32 flex justify-center mt-24 mx-3 py-5 rounded-xl bg-d-c-bg lazy-c">
          <img src="/logo-with-letters.svg" />
        </div> */
}
