"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Variant from "../(component)/variant";
import { Button } from "../../../../../(component)/(styled)/button";
import { InputField, Textarea } from "../../../../../(component)/(styled)/inputs";
import ImageUpload from "../../../../../(component)/(styled)/upload-image";
import { CategorySelect } from "../../../../../(component)/custom-inputs";
import Loader from "../../../../../(layout)/loader";
import { request } from "../../../../../(service)/api-provider";
import { AppSessionContext } from "../../../../../app-session-context";

// Todo: preview the product

export default function ProductById({ params }) {
  const router = useRouter();
  const { lang, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([{}]);

  const handleUpdateVariant = (index, data) => {
    const copy = [...variants];
    for (const k in data) copy[index][k] = data[k];
    setVariants(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const file = f.image.files[0];
    let body = null;
    let id = null;

    setLoading(true);
    try {
      const data = {
        storeId: params.storeId,
        name: f.name.value,
        description: f.description.value,
        category: f.category.value,
        vendor: f.vendor.value,
        variants,
      };

      if (!file) body = { data };
      else {
        const formData = new FormData();
        formData.append("files.image", file, file.name);
        formData.append("data", JSON.stringify(data));
        body = formData;
      }

      if (!product) {
        console.log("create");
        id = (await request("product", "POST", body)).data.id;
      } else {
        console.log("update");

        id = (await request("product", "PUT", { query: "/" + product.id, body })).data.id;
      }

      router.replace(`/store/${params.storeId}/product${id}`); // params
      // router.replace(window.location.pathname.replace("new", id));
    } catch (error) {
      addMessage({ type: "Error", text: error.message, duration: 15 });
    }
    setLoading(false);
  };

  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const { data } = await request("product", "GET", { query: "/" + id + "?populate=*" });
      data.attributes.id = data.id;
      data.attributes.image.data.attributes.id = data.attributes.image.data.id;
      data.attributes.image = data.attributes.image.data.attributes;
      setProduct(data.attributes);
      setVariants(data.attributes.variants);
    } catch (error) {
      addMessage({ type: "Error", text: error.message, duration: 15 });
    }
    setLoading(false);
  };
  console.log(product);

  useEffect(() => {
    if (params.slug.toLowerCase() != "new") fetchProduct(params.slug);
    document.title = (product?.name || content.title[lang]) + " - ALM";
    window.scroll(0, 230);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} dir="auto" className="mb-10">
        <h1 className="text-xl font-semibold text-center mb-3">
          {!product ? content.createH1[lang] : content.updateH1[lang]}
        </h1>

        <ImageUpload
          id="product-image"
          imageUrl={product?.image?.url}
          name="image"
          required={!product}
          alt={product?.name || "Uploaded product image"}
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
          cls="flex-col my-5 text-lg font-semibold ">
          <span className="block mb-1 font-semibold rq">{content.name.text[lang]}</span>
        </InputField>

        <Textarea
          editable={!!product}
          name="description"
          defaultValue={product?.description}
          title={content.description.placeholder[lang]}
          cls="my-5 rounded-md">
          <span className="block mt-3 font-semibold rq">{content.description.text[lang]}</span>
        </Textarea>

        <CategorySelect
          lang={lang}
          defaultValue={product?.category}
          cls="my-5 w-full"
          inCls="text-center mx-2 rounded-full"
        />

        <InputField
          editable={!!product}
          name="vendor"
          defaultValue={product?.vendor}
          label={content.vendor.text[lang]}
          placeholder={content.vendor.placeholder[lang]}
          full={!product || !product?.vendor}
          cls="flex-col my-5"
        />

        <div className="relative my-8">
          <h3 className="block mb-1 font-semibold">{content.variant[lang]}</h3>
          {variants.map((v, index) => (
            <Variant
              lang={lang}
              {...v}
              onRemove={() => setVariants(variants.filter((_, i) => i !== index))}
              onUpdate={(d) => handleUpdateVariant(index, d)}
              number={index + 1}
              key={index}
            />
          ))}

          {variants.length < 20 && (
            <div className="text-right">
              <Button icon="plus" handler={() => setVariants([...variants, {}])} cls="!p-0" iconCls="w-8" />
            </div>
          )}
        </div>

        <div className="text-right">
          <Button type="submit" cls="w-full md:w-auto py-3">
            {!product ? content.create[lang] : content.save[lang]}
          </Button>
        </div>
      </form>
      {loading && <Loader size="100" screen />}
    </>
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
