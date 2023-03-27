"use client";
import { useContext, useEffect, useState } from "react";
import Variant from "../(component)/variant";
import { Button } from "../../../../../(component)/(styled)/button";
import { InputField, Textarea } from "../../../../../(component)/(styled)/inputs";
import ImageUpload from "../../../../../(component)/(styled)/upload-image";
import { CategorySelect } from "../../../../../(component)/custom-inputs";
import { AppSessionContext } from "../../../../../app-session-context";

// Todo: preview the product

export default function ProductById({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([{}]);

  const fetchProduct = async (id) => {
    console.log(id);

    setProduct(fakeProduct);
    setVariants(fakeProduct.variants);
  };

  useEffect(() => {
    if (params.slug.toLowerCase() != "new") fetchProduct(params.slug);
    document.title = (product?.name || content.title[lang]) + " - ALM";
    window.scroll(0, 230);
  }, []);

  return (
    <form dir="auto" className="mb-10">
      <h1 className="text-xl font-semibold text-center mb-3">
        {!product ? content.createH1[lang] : content.updateH1[lang]}
      </h1>

      <ImageUpload
        imageUrl={product?.images[0]?.src}
        name="image"
        required
        alt={product?.name}
        title="Edit product image"
        fullHeight
        cls="h-40"
      />

      <InputField
        editable={!!product}
        type="text"
        name="name"
        required
        defaultValue={product?.name}
        placeholder={content.name.placeholder[lang]}
        min="4"
        max="25"
        full={!product}
        cls="mb-2 text-lg font-semibold">
        <span className="block mb-1 font-semibold rq">{content.name.text[lang]}</span>
      </InputField>

      <div>
        <span className="block mt-3 font-semibold rq">{content.description.text[lang]}</span>
        <Textarea
          editable={!!product}
          name="description"
          defaultValue={product?.description}
          title={content.description.placeholder[lang]}
          cls="mb-3 rounded-md"
        />
      </div>

      <CategorySelect
        lang={lang}
        defaultValue={product?.category}
        cls="w-full mx-0"
        inCls="text-center mx-2 rounded-full"
      />

      <InputField
        editable={!!product}
        name="vendor"
        defaultValue={product?.vendor}
        label={content.vendor.text[lang]}
        placeholder={content.vendor.placeholder[lang]}
        full={!product || !product?.vendor}
      />

      <div className="relative my-5">
        <h3 className="block mb-1 font-semibold">{content.variant[lang]}</h3>

        {variants.map((v, index) => (
          <Variant
            lang={lang}
            {...v}
            onRemove={() => setVariants(variants.filter((_, i) => i !== index))}
            number={index + 1}
            key={index}
          />
        ))}

        {variants.length < 20 && (
          <div className="text-right">
            <Button
              name="addVariant"
              icon="plus"
              handler={() => setVariants([...variants, {}])}
              cls="!p-0"
              iconCls="w-8"
            />
          </div>
        )}
      </div>

      <div className="text-right">
        <Button type="submit" cls="w-full md:w-auto py-2">
          {!product ? content.create[lang] : content.save[lang]}
        </Button>
      </div>
    </form>
  );
}

const content = {
  title: { en: "Create new product", ar: "إنشاء منتج جديد" },
  createH1: { en: "New product", ar: "منتج جديد" },
  updateH1: { en: "Update product", ar: "تحديث جديد" },
  name: {
    text: { en: "Product name", ar: "اسم المنتج" },
    placeholder: { en: "E.g. Black Tea", ar: "مثال, شاي أسود" },
  },
  description: {
    text: { en: "Product description", ar: "وصف المنتج" },
    placeholder: {
      en: "A fresh nice black tea from ... E.g. brand name, etc",
      ar: "مثال, شاي أسود طازج ولذيذ من ... اسم العلامة التجارية، إلخ",
    },
  },
  vendor: {
    text: { en: "Vendor / Supplier", ar: "المورد / المزود" },
    placeholder: { en: "E.g. Lipton", ar: "مثال, ليبتون" },
  },
  variant: { en: "Variants", ar: "الاصناف" },
  create: { en: "Create", ar: "إنشاء" },
  save: { en: "Save", ar: "حفظ" },
};

const fakeProduct = {
  id: "12",
  name: "Tea 1",
  category: "Beverages",
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
      options: [
        { name: "COLOR", value: "red" },
        { name: "SIZE", value: "small" },
        { name: "FLAVOR", value: "Chicken" },
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
        { name: "COLOR", value: "green" },
        { name: "SIZE", value: "small" },
        { name: "FLAVOR", value: "Chicken" },
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
        { name: "COLOR", value: "green" },
        { name: "SIZE", value: "large" },
        { name: "FLAVOR", value: "Chicken" },
      ],
    },
  ],
};
