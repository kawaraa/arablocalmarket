"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
import { AppSessionContext } from "../../../../app-session-context";
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
  const [options, setOptions] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const { lang } = useContext(AppSessionContext);

  const store = { id: "1", currency: "€" };
  console.log("Product ID, Name or title: ", params.slug);

  const handleAddToFavorite = () => {
    console.log("handleAddToFavorite");
  };

  const handleAddToCart = () => {
    console.log("handleAddToCart");
  };
  const handleCheckout = () => {
    console.log("handleCheckout");
  };

  useEffect(() => {
    const ops = new Set();
    product.variants.map((v) => ops.add(v.options[0]?.value));
    setOptions(Array.from(ops));
    setOption1(product.variants[0].options[0]?.value);
    setOption2(product.variants[0].options[1]?.value);
    setOption3(product.variants[0].options[2]?.value);
  }, []);

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

      <div className="flex items-center">
        <h3 className="w-16">{product.variants[0].options[0].name || ""}</h3>
        <ul className="flex items-center">
          {options.map((op, i) => (
            <li key={i} className="overflow-hidden relative flex border border-bc rounded-md mx-1 text-sm">
              <input
                type="radio"
                id={op}
                className="absolute inset-0 opacity-0 peer cursor-pointer"
                onChange={() => setOption1(op)}
                checked={op == option1}
              />
              <label
                htmlFor={op}
                className="px-1 bg-dbg dark:bg-pc text-dt dark:text-t peer-checked:bg-red peer-checked:text-dt">
                {op}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center mt-3">
        <h3 className="w-16">{product.variants[0].options[1].name || ""}</h3>
        <ul className="flex items-center">
          {product.variants
            .filter((v) => v.options[0]?.value == option1 && v.options[1]?.value)
            .map((v, i) => (
              <li key={i} className="overflow-hidden relative flex border border-bc rounded-md mx-1 text-sm">
                <input
                  type="radio"
                  id={v.options[1]?.value}
                  className="absolute inset-0 opacity-0 peer cursor-pointer"
                  onChange={() => setOption2(v.options[1]?.value)}
                  checked={v.options[1]?.value == option2}
                />
                <label
                  htmlFor={v.options[1]?.value}
                  className="px-1 bg-dbg dark:bg-pc text-dt dark:text-t peer-checked:bg-red peer-checked:text-dt">
                  {v.options[1]?.value} {v.weight ? v.weight + v.weightUnit : ""}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex items-center mt-3">
        <h3 className="w-16">{product.variants[0].options[2].name || ""}</h3>
        <ul className="flex items-center">
          {product.variants
            .filter((v) => v.options[1]?.value == option2 && v.options[2]?.value)
            .map((v, i) => (
              <li key={i} className="overflow-hidden relative flex border border-bc rounded-md mx-1 text-sm">
                <input
                  type="radio"
                  id={v.options[2]?.value}
                  className="absolute inset-0 opacity-0 peer cursor-pointer"
                  onChange={() => setOption3(v.options[2]?.value)}
                  checked={v.options[2]?.value == option3}
                />
                <label
                  htmlFor={v.options[2]?.value}
                  className="px-1 bg-dbg dark:bg-pc text-dt dark:text-t peer-checked:bg-red peer-checked:text-dt">
                  {v.options[2]?.value}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <h2 className="text-lg my-3">{product.title}</h2>
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

        <Button
          text={data.buyBtn.text[lang]}
          handler={handleCheckout}
          cls="!text-lg font-medium shadow-none"
        />
      </div>
    </>
  );
}

const data = {
  buyBtn: { text: { en: "Buy", ar: "شراء" } },
  // description: { text: { en: "Description", ar: "" } },
};

const product = {
  id: "12",
  title: "Chips 1",
  category: "snack",
  description:
    " Welcome to our supermarket, where we are committed to providing you with a convenient and enjoyable shopping experience. We understand that grocery shopping can be a chore, which is why we have worked hard to create a space that is easy to navigate, well-stocked with a wide range of products, and staffed by friendly and knowledgeable team members.",
  price: 23,
  vendor: "Nutella",
  featuredImageId: "id-3231",
  images: [
    { id: "id-3231", src: "/produce-vegetables-clipart.png" },
    { id: "id-8686", src: "/canned-food-clipart.png" },
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
