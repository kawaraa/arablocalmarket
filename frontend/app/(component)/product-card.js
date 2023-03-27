import Link from "next/link";
import Image from "next/image";
import ProductCardButtons from "./product-card-buttons";
import SvgIcon from "./(styled)/svg-icon";
import StarRating from "./(styled)/rating";

export default function ProductCard({ lang, link, currency, admin, ...p }) {
  const Tag = typeof link == "function" ? "div" : Link;
  const newP = typeof link == "function" ? { onClick: () => link(p) } : { href: link };

  return (
    <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c">
      <Tag {...newP} className="relative block w-full p-2 bg-cbg card cd_hr rounded-xl duration-150">
        <h3 className="text-center mt-2">{p.name}</h3>
        <div className="overflow-hidden h-40 flex justify-center items-center">
          <Image src={p.image?.src} alt={p.name} width="250" height="250" className="max-h-36 w-auto" />
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
              <span role="img" className="w-[18px] ml-1" title={content.stock[lang]}>
                <SvgIcon name="boxes" />
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
      </Tag>
    </li>
  );
}

const content = { stock: { en: "In stock", ar: "في المخزن" }, variants: { en: "Variants", ar: "اصناف" } };
