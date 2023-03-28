"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AppSessionContext } from "../../../../app-session-context";
import { copyText } from "../../../../(service)/utilities";
import SvgIcon from "../../../../(component)/(styled)/svg-icon";
import { Button, IconButton } from "../../../../(component)/(styled)/button";
import { useRouter } from "next/navigation";
import { NumberInputWithControl } from "../../../../(component)/(styled)/inputs";
import VariantOptions from "../../../../(component)/variant-options";

// For more info on how to dynamically changing the title https://beta.nextjs.org/docs/guides/seo
export const metadata = { title: "Product Name / title - store name - ALM" };

// slug could be product ID, barcode E.g. UPC/IAN/EAN or product-title (in future search in th product description)

export default function ProductBySlug({ params }) {
  const router = useRouter();
  const { lang } = useContext(AppSessionContext);
  const [imgPreviewIndex, setImgPreviewIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const store = { id: "1", currency: "€" };
  console.log("Product ID, Name or title: ", params.slug);

  const handleAddToFavorite = () => {
    console.log("handleAddToFavorite");
  };

  const handleAddToCart = () => {
    console.log("handleAddToCart");
  };
  const handleBuy = () => {
    console.log("handleBuy");

    router.push("/checkout");
  };

  const handleShare = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
    if (navigator.share) return navigator.share(window.location.href);
    copyText(window.location.href, (copied) => alert((copied ? "Copied" : "Could not copy") + " store link"));
  };

  const updateSelectedOptions = (index, value) => {
    const options = [...selectedOptions];
    options[index] = value;
    setSelectedOptions(options);
  };

  useEffect(() => {
    const options = {};

    for (const variant of product.variants) {
      const sV = variant.options.find((opt) => !selectedOptions[0] || selectedOptions.includes(opt.value));
      variant.options.forEach((opt, i) => {
        if (sV || i === 0) {
          if (options[opt.name]) options[opt.name].add(opt.value);
          else options[opt.name] = new Set([opt.value]);
        }
      });
    }

    Object.keys(options).forEach((name) => (options[name] = Array.from(options[name])));
    setOptions(options);
  }, [selectedOptions]);

  return (
    <>
      <div className="relative flex justify-center items-center h-32 ">
        <Image
          src={product.images[imgPreviewIndex].src}
          alt={product.name}
          width="250"
          height="250"
          className="h-full w-auto"
        />
        <IconButton
          handler={handleShare}
          title="Share"
          icon="share"
          aria-label="Share"
          cls="absolute top-3 right-3 hover:text-pc"
        />
      </div>
      <div className="flex my-5">
        {product.images.map((img, i) => (
          <button
            className="overflow-hidden h-14 w-14 border border-bc mx-1 rounded-md"
            onClick={() => setImgPreviewIndex(i)}
            key={i}>
            <Image src={img.src} alt={product.name} width="250" height="250" className="h-auto w-full" />
          </button>
        ))}
      </div>

      {Object.keys(options).map((name, i) => (
        <VariantOptions
          name={name}
          values={options[name]}
          onSelect={(v) => updateSelectedOptions(i, v)}
          selectedOptions={selectedOptions}
          label
          key={i}
        />
      ))}

      <div className="mt-7 mb-3 flex justify-center items-center">
        <NumberInputWithControl
          name="quantity"
          value={quantity}
          min="1"
          max="10"
          onChange={(n) => setQuantity(quantity + n < 0 ? 0 : quantity + n)}
          title="Quantity"
        />

        <div className="absolute right-3 text-sm font-light">
          <span className="font-medium">{15}</span> in Stock
        </div>
      </div>

      <h2 className="text-lg my-3">{product.name}</h2>
      <p className="text-sm mb-10">{product.description}</p>

      <div className="flex justify-around items-center fixed bottom-0 right-0 left-0 h-12 bg-lbg dark:bg-dbg">
        <p className="min-w-12 text-red text-xl">
          {store.currency}
          {product.price}
        </p>

        <button
          className="w-12 h-10 px-3 fill-none hover:text-dbg dark:hover:text-pc"
          onClick={handleAddToFavorite}>
          <SvgIcon name="favorite" />
        </button>

        <button className="w-12 h-10 px-[10px] hover:text-dbg dark:hover:text-pc" onClick={handleAddToCart}>
          <SvgIcon name="cart" />
        </button>

        <Button handler={handleBuy} cls="!text-lg font-medium shadow-none">
          {content.buyBtn[lang]}
        </Button>
      </div>
    </>
  );
}

const content = {
  buyBtn: { en: "Buy", ar: "شراء" },
};

const product = {
  id: "12",
  name: "Chips 1",
  category: "snack",
  description:
    "Welcome to our supermarket, where we are committed to providing you with a convenient and enjoyable shopping experience. We understand that grocery shopping can be a chore, which is why we have worked hard to create a space that is easy to navigate, well-stocked with a wide range of products, and staffed by friendly and knowledgeable team members.",
  price: 23,
  vendor: "Nutella",
  featuredImageId: "id-3231",
  images: [
    { id: "id-3231", src: "/produce-vegetables-clipart.png" },
    { id: "id-8686", src: "/dairy-clipart.png" },
  ],
  variants: [
    {
      id: "11",
      barcode: "34564321234",
      imageId: "id-3231",
      price: 13,
      comparePrice: 0,
      quantity: 15,
      weight: 1,
      weightUnit: "KG",
      options: [
        { name: "color", value: "red" },
        { name: "size", value: "small" },
        { name: "material", value: "plastic" },
      ],
    },
    {
      id: "22",
      barcode: "974321234",
      imageId: "id-8686",
      price: 8,
      comparePrice: 0,
      quantity: 10,
      weight: 2,
      weightUnit: "KG",
      options: [
        { name: "color", value: "green" },
        { name: "size", value: "small" },
        { name: "material", value: "metals" },
      ],
    },
    {
      id: "22",
      barcode: "974321234",
      imageId: "id-8686",
      price: 8,
      comparePrice: 0,
      quantity: 10,
      weight: 2,
      weightUnit: "KG",
      options: [
        { name: "color", value: "green" },
        { name: "size", value: "large" },
        { name: "material", value: "metals" },
      ],
    },
  ],
};
