"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Variant from "../(component)/variant";
import { Button, IconButton } from "../../../../../(component)/(styled)/button";
import { InputField, Textarea } from "../../../../../(component)/(styled)/inputs";
import ImageUpload from "../../../../../(component)/(styled)/upload-image";
import { CategorySelect } from "../../../../../(component)/custom-inputs";
import Loader from "../../../../../(layout)/loader";
import { request } from "../../../../../(service)/api-provider";
import { AppSessionContext } from "../../../../../app-session-context";
import shdCnt from "../../../../../(layout)/json/shared-content.json";
import Modal from "../../../../../(component)/(styled)/modal";

export default function ProductById({ params }) {
  const router = useRouter();
  const { lang, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [initialLoading, setInitialLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [variants, setVariants] = useState([{ quantity: 0 }]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleUpdateVariant = (index, data) => {
    const copy = [...variants];
    for (const k in data) copy[index][k] = data[k];
    setVariants(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    let body = null;
    let id = null;

    setAppLoading(true);
    try {
      const data = {
        storeId: +params.storeId,
        name: f.name.value,
        description: f.description.value,
        category: f.category.value,
        vendor: f.vendor.value,
        variants,
      };

      const formData = new FormData();
      if (!file) body = { data };
      else {
        formData.append("files.image", file, file.name);
        formData.append("data", JSON.stringify(data));
        body = formData;
      }

      if (!product) {
        id = (await request("product", "POST", body)).data.id;
      } else {
        id = (await request("product", "PUT", { query: "/" + product.id, body })).data.id;
      }

      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
      router.replace(`/store/${params.storeId}/product/${id}`);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setAppLoading(false);
  };

  const handleDelete = async () => {
    setDeleteConfirmation(false);
    setAppLoading(true);
    try {
      await request("product", "DELETE", { query: `/${product.id}?storeId=${params.storeId}` });
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
      router.replace(`/admin/store/${params.storeId}/product`);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }

    setAppLoading(false);
  };

  const fetchProduct = async (id) => {
    setInitialLoading(true);
    try {
      const { data } = await request("product", "GET", {
        query: "/" + id + "?populate[image]=*&populate[variants][populate]=*&populate[rating]=*",
      });

      data.attributes.id = data.id;
      if (!data.attributes?.image.data) data.attributes.image = null;
      else {
        data.attributes.image.data.attributes.id = data.attributes.image.data.id;
        data.attributes.image = data.attributes.image.data.attributes;
      }
      setProduct(data.attributes);
      setVariants(data.attributes.variants);
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 5 });
    }
    setInitialLoading(false);
  };

  useEffect(() => {
    if (params.slug.toLowerCase() != "new") fetchProduct(params.slug);
    document.title = (product?.name || content.title[lang]) + " - ALM";
    window.scroll(0, 230);
  }, []);

  if (initialLoading) return <Loader size="100" screen />;
  return (
    <>
      <form onSubmit={handleSubmit} dir="auto" className="mb-10">
        <h1 className="flex justify-center text-xl font-semibold mb-3">
          {!product ? content.createH1[lang] : content.updateH1[lang]}
          {product && (
            <IconButton
              icon="eye"
              onClick={() => router.push(`/store/${params.storeId}/product/${params.slug}`)}
            />
          )}
        </h1>

        <ImageUpload
          id="product-image"
          imageUrl={product?.image?.url}
          // name="image"
          onFile={setFile}
          required={!product?.image?.url}
          alt={product?.name || content.upload[lang]}
          title={content.upload[lang]}
          fullHeight
          product
          cls="h-40"
        />

        <InputField
          type="text"
          name="name"
          required
          defaultValue={product?.name}
          placeholder={content.name.placeholder[lang]}
          min="4"
          max="25"
          full
          cls="flex-col my-5 text-lg font-semibold ">
          <span className="block mb-1 font-semibold rq">{content.name.text[lang]}</span>
        </InputField>

        <Textarea
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
          name="vendor"
          defaultValue={product?.vendor}
          label={content.vendor.text[lang]}
          placeholder={content.vendor.placeholder[lang]}
          full
          cls="flex-col my-5"
        />

        <div className="relative my-8">
          <h3 className="block mb-1 font-semibold">{content.variant[lang]}</h3>
          {variants.map((v, index) => (
            <Variant
              lang={lang}
              {...v}
              onRemove={!variants[1] ? null : () => setVariants(variants.filter((_, i) => i !== index))}
              onUpdate={(d) => handleUpdateVariant(index, d)}
              number={index + 1}
              setMessage={addMessage}
              key={index}
            />
          ))}

          {variants.length < 20 && (
            <div className="text-right">
              <Button
                icon="plus"
                onClick={() => setVariants([...variants, { quantity: 0 }])}
                cls="!p-0"
                iconCls="w-8"
              />
            </div>
          )}
        </div>

        <div className="flex my-5">
          <Button type="submit" cls="py-2 px-5 text-lg">
            {!product ? content.create[lang] : shdCnt.save[lang]}
          </Button>

          {product && (
            <>
              <span className="w-5 h-5"></span>
              <Button
                type="button"
                onClick={() => setDeleteConfirmation(true)}
                cls="py-2 px-5 bg-bg3 text-bg text-lg">
                {shdCnt.delete[lang]}
              </Button>
            </>
          )}
        </div>
      </form>

      <Modal
        title={content.confirmTitle[lang]}
        okBtn={shdCnt.yes[lang]}
        onCancel={() => setDeleteConfirmation(false)}
        onApprove={handleDelete}
        open={deleteConfirmation}>
        <p className="my-5">{content.confirmP[lang]}</p>
      </Modal>
    </>
  );
}

const content = {
  title: { en: "Create new product", ar: "إنشاء منتج جديد" },
  createH1: { en: "New product", ar: "منتج جديد" },
  updateH1: { en: "Update product", ar: "تحديث جديد" },
  upload: { en: "Upload product image", ar: "تحميل صورة المنتج" },
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
  confirmTitle: { en: "product delete confirmation", ar: "تأكيد حذف المنتج" },
  confirmP: {
    en: "Are you sure you want to delete this product?",
    ar: "هل أنت متأكد أنك تريد حذف هذا المنتج؟",
  },
};
