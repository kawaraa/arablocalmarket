import Link from "next/link";
import Image from "next/image";
import ProductCardButtons from "./product-card-buttons";
import SvgIcon from "./(styled)/svg-icon";
import StarRating from "./(styled)/rating";
import shdCnt from "../(layout)/json/shared-content.json";
import { ShareButton } from "./share-button";
import { getCssDelay } from "../(service)/utilities";

export default function ProductCard({ lang, link, currency, id, admin, product, priority }) {
  const Tag = typeof link == "function" ? "div" : Link;
  const newP =
    typeof link == "function"
      ? { onClick: () => link(product) }
      : { hrefLang: lang, href: link, passHref: true, legacyBehavior: true };

  const v = product.variants.sort()[0];

  return (
    <li className="relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-1 lazy-b" style={getCssDelay()}>
      {!admin && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              image: product.image.data?.attributes.formats.thumbnail.url,
              description: product.description,
              // offers: {
              //   "@type": "AggregateOffer",
              //   offerCount: variants.length,
              //   availability: available > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              //   priceCurrency: "EUR",
              //   highPrice: product.highPrice,
              //   lowPrice: product.lowPrice,
              // },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.ratings.stars || 1,
                reviewCount: product.ratings.total || 1,
                bestRating: 5,
                worstRating: 1,
              },
            }),
          }}
        />
      )}

      <Tag {...newP}>
        <a className="relative overflow-hidden block w-full h-full bg-cbg card cd_hr rounded-xl duration-150">
          <div className="overflow-hidden aspect-square">
            <Image
              src={product.image.data?.attributes.formats.thumbnail.url}
              alt={product.name}
              width="300"
              height="300"
              className="w-full"
              priority={priority}
            />
          </div>
          <h3
            title={product.name}
            className="text-ellipsis overflow-hidden whitespace-nowrap text-center m-2">
            {product.name}
          </h3>
          <div className={`flex justify-end items-center mx-2`}>
            <strong className="text-lg">
              <span className="text-red">{currency + v.price} </span>
              {!admin && v.comparePrice > 0 && (
                <span className="line-through">{currency + v.comparePrice}</span>
              )}
            </strong>

            <ProductCardButtons
              productId={id}
              variantsNumber={product.variants.reduce((t, v) => t + v.quantity, 0)}
              title={shdCnt.stock[lang]}
              admin={admin}
            />
          </div>
          {admin && (
            <div className="flex justify-between items-center mt-1 mx-2">
              <div title={shdCnt.variants[lang]} className="flex items-center">
                {product.variants.length}
                <div className="flex items-center -space-x-1">
                  <span className="w-[14px] h-[14px] ml-1 bg-bg1 rounded-full"> </span>
                  <span className="w-[14px] h-[14px] bg-bg3 rounded-full"> </span>
                  <span className="w-[14px] h-[14px] bg-bg6 rounded-full"> </span>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm">{product.favorites?.data.length || 0}</span>
                <span className="w-4 ml-1 text-red fill-none">
                  <SvgIcon name="heart" />
                </span>
              </div>
            </div>
          )}
          <div className="mt-1 mb-2 mx-2">
            <StarRating stars={product.ratings.stars} cls="text-md md:text-lg" />
            {admin && <span className="text-xs mx-1">{product.ratings.total}</span>}
          </div>
        </a>
      </Tag>
      {Tag != "div" && (
        <ShareButton
          title={product.name}
          text={product.description}
          url={link.replace("/admin", "")}
          cls="block w-6 absolute bottom-3 right-3 hover:text-pc"
        />
      )}
    </li>
  );
}
