import Link from "next/link";
import Image from "next/image";
import ProductCardButtons from "./product-card-buttons";
import SvgIcon from "./(styled)/svg-icon";
import StarRating from "./(styled)/rating";

export default function ProductCard({ link, currency, admin, ...p }) {
  return (
    <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c">
      <Link href={link} className="relative block w-full p-2 bg-cbg card cd_hr rounded-xl duration-200">
        <h3 className="text-center mt-2">{p.title}</h3>
        <div className="overflow-hidden h-40 flex justify-center items-center">
          <Image src={p.image} alt={p.title} width="250" height="250" className="max-h-36 w-auto" />
        </div>

        <StarRating stars={3} cls="text-sm md:text-md" />

        <div className="flex justify-between items-center px-2">
          <p className="text-red text-lg">
            {currency}
            {p.price}
          </p>

          {!admin ? <ProductCardButtons id={p.id} cls="fill-none" /> : <span>232</span>}
          {/* Use icon for the number of the variants */}
        </div>

        <div className="flex justify-between items-center mt-2 px-2">
          {/* Use Icon for quantity */}
          <span>10</span>
          <div className="flex items-center">
            <span>232</span>
            <span className={"w-5 ml-1 " + "fill-none"}>
              {/* if p.favorite.length then add fill-none */}
              <SvgIcon name="heart" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
