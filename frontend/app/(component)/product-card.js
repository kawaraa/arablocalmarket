import Link from "next/link";
import Image from "next/image";
import ProductCardButtons from "./product-card-buttons";
import SvgIcon from "./(styled)/svg-icon";
import StarRating from "./(styled)/rating";

export default function ProductCard({ lang, link, currency, admin, ...p }) {
  return (
    <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c">
      <Link href={link} className="relative block w-full p-2 bg-cbg card cd_hr rounded-xl duration-150">
        <h3 className="text-center mt-2">{p.title}</h3>
        <div className="overflow-hidden h-40 flex justify-center items-center">
          <Image src={p.image} alt={p.title} width="250" height="250" className="max-h-36 w-auto" />
        </div>

        <div className="flex justify-between items-center">
          <strong className="text-red text-lg">
            {currency}
            {p.price}
          </strong>

          {!admin ? (
            <ProductCardButtons id={p.id} cls="fill-none" />
          ) : (
            <div className="flex items-center">
              232
              <span role="img" className="w-4 ml-1" title={content.stock[lang]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                  className="w-full "
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="m 12.666667,7.666665 -1.666667,0 0,2 -0.666667,-0.44375 -0.6666663,0.44375 0,-2 -1.6666667,0 c -0.1833333,0 -0.3333333,0.15 -0.3333333,0.33334 l 0,4 c 0,0.18333 0.15,0.33333 0.3333333,0.33333 l 4.666667,0 C 12.85,12.333335 13,12.183335 13,12.000005 l 0,-4 c 0,-0.18334 -0.15,-0.33334 -0.333333,-0.33334 z m -8.0000003,-1.33333 4.6666666,0 c 0.1833334,0 0.3333334,-0.15 0.3333334,-0.33333 l 0,-4 c 0,-0.18334 -0.15,-0.33334 -0.3333334,-0.33334 l -1.6666666,0 0,2 L 7,3.222915 l -0.6666667,0.44375 0,-2 -1.6666666,0 c -0.1833334,0 -0.3333334,0.15 -0.3333334,0.33334 l 0,4 c 0,0.18333 0.15,0.33333 0.3333334,0.33333 z M 6,7.666665 l -1.6666667,0 0,2 L 3.6666667,9.222915 3,9.666665 l 0,-2 -1.6666667,0 C 1.15,7.666665 1,7.816665 1,8.000005 l 0,4 c 0,0.18333 0.15,0.33333 0.3333333,0.33333 l 4.6666667,0 c 0.1833333,0 0.3333333,-0.15 0.3333333,-0.33333 l 0,-4 c 0,-0.18334 -0.15,-0.33334 -0.3333333,-0.33334 z" />
                </svg>
              </span>
            </div>
          )}
        </div>
        {/* Use icon for the number of the variants */}
        {admin && (
          <div className="flex justify-between items-center mt-1">
            <span title={content.variants[lang]}>3</span>

            <div className="flex items-center">
              <span className="text-xs">232</span>
              <span className={"w-4 ml-1 " + "fill-none"}>
                {/* if p.favorite.length then add fill-none */}
                <SvgIcon name="heart" />
              </span>
            </div>
          </div>
        )}

        <div>
          <StarRating stars={3} cls="text-md md:text-lg" />
          {admin && <span className="text-xs mx-1">{324}</span>}
        </div>
      </Link>
    </li>
  );
}

const content = { stock: { en: "In stock", ar: "في المخزن" }, variants: { en: "Variants", ar: "اصناف" } };
