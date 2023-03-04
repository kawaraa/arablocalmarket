"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
import ProductButtons from "../../../../(component)/product-buttons";
import SvgIcon from "../../../../(component)/(styled)/svg-icon";
import Button from "../../../../(component)/(styled)/button";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Product Name / title - store name - ALM" };

// http://localhost:3000/store/1/product/1
// http://localhost:3000/store/1/product/barcode // UPC/IAN/EAN
// http://localhost:3000/store/1/product/product-name
// http://localhost:3000/store/1/product/product-title

export default function ProductBySlug({ params }) {
  const [imgPreviewIndex, setImgPreviewIndex] = useState(0);

  const { lang } = useContext(AppSessionContext);

  const store = { id: "1", currency: "€" };
  console.log("Product ID, Name or title: ", params.slug);

  const handleAddToFavorite = () => {
    console.log("Buy");
  };

  const handleAddToCart = () => {
    console.log("Buy");
  };

  return (
    <>
      <div className="flex justify-center items-center h-32 ">
        <Image
          src={product.images[imgPreviewIndex].src}
          alt={product.title}
          width="250"
          height="250"
          className="h-full w-auto"
        />
      </div>
      <div className="flex my-5">
        {product.images.map((img, i) => (
          <button
            className="overflow-hidden h-14 w-14 border border-bc mx-1 rounded-md"
            onClick={() => setImgPreviewIndex(i)}
            key={i}>
            <Image src={img.src} alt={product.title} width="250" height="250" className="h-auto w-full" />
          </button>
        ))}
      </div>

      {/* Variants */}

      <h2 className="text-lg mb-3">{product.title}</h2>

      <p className="text-sm">{product.description}</p>

      <div className="flex justify-around items-center fixed bottom-0 right-0 left-0 h-12 bg-lbg ">
        <p className="min-w-12 text-red text-xl">
          {store.currency}
          {product.price}
        </p>

        <button className="w-12 h-10 px-3 fill-none hover:text-dbg " onClick={handleAddToFavorite}>
          <SvgIcon name="heart" />
        </button>

        <button className="w-12 h-10 px-[10px] hover:text-dbg " onClick={handleAddToCart}>
          <SvgIcon name="cart" />
        </button>

        <Button
          text={data.buyBtn.text[lang]}
          handler={handleAddToCart}
          cls="!text-lg font-medium shadow-none"
        />
      </div>
    </>
  );
}

const data = {
  buyBtn: { text: { en: "Buy", ar: "" } },
  // description: { text: { en: "Description", ar: "" } },
};

const product = {
  id: "12",
  title: "Produce",
  category: "",
  description:
    " Welcome to our supermarket, where we are committed to providing you with a convenient and enjoyable shopping experience. We understand that grocery shopping can be a chore, which is why we have worked hard to create a space that is easy to navigate, well-stocked with a wide range of products, and staffed by friendly and knowledgeable team members.",
  price: 23,
  vendor: "",
  featuredImageId: "",
  images: [{ id: "", src: "/produce-vegetables-clipart.png" }],
  variants: [{}],
};
