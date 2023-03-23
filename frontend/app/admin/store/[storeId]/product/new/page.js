"use client";
import { useContext, useEffect, useState } from "react";
import Variant from "../(component)/variant";
import { Button } from "../../../../../(component)/(styled)/button";
import { InputField, Textarea } from "../../../../../(component)/(styled)/inputs";
import ImageUpload from "../../../../../(component)/(styled)/upload-image";
import { CategorySelect } from "../../../../../(component)/custom-inputs";
import { AppSessionContext } from "../../../../../app-session-context";

export default function ProductById({ params, searchParams, ...product }) {
  const { lang } = useContext(AppSessionContext);
  const [variants, setVariants] = useState([{}]);
  // const [imageData, setImageData] = useState("");

  // console.log("Todo: Product ID, Name or title: ", params.slug, variants);

  useEffect(() => {
    document.title = "Product Name / title - store name - ALM";
    window.scroll(0, 230);
  }, []);

  return (
    <form dir="auto" className="mb-10">
      <h1 className="text-xl font-semibold text-center mb-3">{content.h1[lang]}</h1>

      <InputField
        type="text"
        name="name"
        placeholder={content.name.placeholder[lang]}
        required
        min="4"
        max="25"
        full
        cls="mb-2">
        <span className="block mb-1 font-semibold rq">{content.name.text[lang]}</span>
      </InputField>

      <Textarea name="about" title={content.description.placeholder[lang]} cls="mb-3" />

      <ImageUpload name="image" required />

      <CategorySelect lang={lang} cls="w-full mx-0" />

      <InputField
        name="vendor"
        label={content.vendor.text[lang]}
        placeholder={content.vendor.placeholder[lang]}
        full
      />

      <div className="relative my-5">
        <h3 className="block mb-1 font-semibold">{content.variant[lang]}</h3>

        {variants.map((v, i) => (
          <Variant lang={lang} {...v} number={i + 1} key={i} />
        ))}

        <div className="text-right">
          <Button
            name="addVariant"
            icon="plus"
            handler={() => setVariants([...variants, {}])}
            cls="!p-0"
            iconCls="w-8"
          />
        </div>
      </div>

      <div className="text-right">
        <Button text={content.btn[lang]} type="submit" cls="w-full md:w-auto py-2" />
      </div>
    </form>
  );
}

const content = {
  h1: { en: "New product", ar: "منتج جديد" },
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
  btn: { en: "Create", ar: "إنشاء" },
};
