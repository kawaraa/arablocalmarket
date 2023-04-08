import Link from "next/link";
import Image from "next/image";
import ProductCardButtons from "./product-card-buttons";
import SvgIcon from "./(styled)/svg-icon";
import StarRating from "./(styled)/rating";

export default function ProductCard({ lang, link, currency, id, admin, product }) {
  const Tag = typeof link == "function" ? "div" : Link;
  const newP = typeof link == "function" ? { onClick: () => link(p) } : { href: link };

  return (
    <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-c">
      <Tag {...newP} className="relative block w-full p-2 bg-cbg card cd_hr rounded-xl duration-150">
        <h3 className="text-center mt-2">{product.name}</h3>
        <div className="overflow-hidden h-40 flex justify-center items-center">
          <Image
            // Todo: find a default product image
            src={product.image.data?.attributes.formats.thumbnail.url || "/legumes-grains-clipart.png"}
            alt={product.name}
            width="250"
            height="250"
            className="max-h-36 w-auto"
          />
        </div>

        <div className={`flex justify-end items-center`}>
          <strong className="text-red text-lg">
            {currency}
            {product.variants.sort()[0].price}
          </strong>

          {!admin ? (
            <ProductCardButtons productId={id} />
          ) : (
            <>
              <span className="flex-1"></span>
              <div className="flex items-center">
                {product.variants.reduce((t, v) => t + v.quantity, 0)}
                <span role="img" className="w-[18px] ml-1" title={content.stock[lang]}>
                  <SvgIcon name="boxes" />
                </span>
              </div>
            </>
          )}
        </div>

        {/* Use icon for the number of the variants */}
        {admin && (
          <div className="flex justify-between items-center mt-1">
            <span title={content.variants[lang]} className="flex items-center">
              {product.variants.length} <span className="w-2 h-2 ml-1 bg-red rounded-full"> </span>
              <span className="w-2 h-2 m-[1px] bg-green rounded-full"> </span>
              <span className="w-2 h-2 bg-blue rounded-full"> </span>
            </span>

            <div className="flex items-center">
              <span className="text-xs">{product.favorites?.data.length || 0}</span>
              <span className="w-4 ml-1 text-red fill-none">
                <SvgIcon name="heart" />
              </span>
            </div>
          </div>
        )}

        <div>
          <StarRating stars={product.ratings.stars} cls="text-md md:text-lg" />
          {admin && <span className="text-xs mx-1">{product.ratings.total}</span>}
        </div>
      </Tag>
    </li>
  );
}

const content = { stock: { en: "In stock", ar: "في المخزن" }, variants: { en: "Variants", ar: "اصناف" } };
