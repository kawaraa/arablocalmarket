import Link from "next/link";
import Image from "next/image";
import ProductCardButtons from "./product-card-buttons";
import SvgIcon from "./(styled)/svg-icon";
import StarRating from "./(styled)/rating";
import shdCnt from "../(layout)/json/shared-content.json";

export default function ProductCard({ lang, link, currency, id, admin, product, priority }) {
  const Tag = typeof link == "function" ? "div" : Link;
  const newP = typeof link == "function" ? { onClick: () => link(product) } : { href: link };

  return (
    <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c">
      <Tag {...newP} className="relative block w-full p-2 bg-cbg card cd_hr rounded-xl duration-150">
        <h3 className="text-center mt-2">{product.name}</h3>
        <div className="overflow-hidden h-40 flex justify-center items-center">
          <Image
            src={product.image.data?.attributes.formats.thumbnail.url}
            alt={product.name}
            width="200"
            height="200"
            className="max-h-36 w-full"
            priority={priority}
          />
        </div>

        <div className={`flex justify-end items-center`}>
          <strong className="text-red text-lg">
            {currency}
            {product.variants.sort()[0].price}
          </strong>

          <ProductCardButtons
            productId={id}
            variantsNumber={product.variants.reduce((t, v) => t + v.quantity, 0)}
            title={shdCnt.stock[lang]}
            admin={admin}
          />
        </div>

        {admin && (
          <div className="flex justify-between items-center mt-1">
            <span title={shdCnt.variants[lang]} className="flex items-center">
              {product.variants.length}
              <span className="w-2 h-2 ml-1 bg-green rounded-full"> </span>
              <span className="w-2 h-2 m-[1px] bg-red rounded-full"> </span>
              <span className="w-2 h-2 bg-blue rounded-full"> </span>
            </span>

            <div className="flex items-center">
              <span className="text-sm">{product.favorites?.data.length || 0}</span>
              <span className="w-4 ml-1 text-red fill-none">
                <SvgIcon name="heart" />
              </span>
            </div>
          </div>
        )}

        <div className="mt-1">
          <StarRating stars={product.ratings.stars} cls="text-md md:text-lg" />
          {admin && <span className="text-xs mx-1">{product.ratings.total}</span>}
        </div>
      </Tag>
    </li>
  );
}
