"use client";
import { useEffect, useState } from "react";
import { InputField, Textarea } from "../../../../../(component)/(styled)/inputs";
import ImageUpload from "../../../../../(component)/(styled)/upload-image";

// Todo Think of view, create and update product admin page
// Can the admin review and update the product at the same time?
// Create button should be easy to reach?

export default function ProductById({ params, searchParams }) {
  const [product, setProduct] = useState(fakeProduct);

  console.log("Product ID, Name or title: ", params.slug);

  useEffect(() => {
    document.title = "Product Name / title - store name - ALM";
    window.scroll(0, 230);
  }, []);

  return (
    <>
      <ImageUpload
        imageUrl={product.images[0].src}
        alt={product.name}
        title="Edit product image"
        fullHeight
        cls="h-40"
      />

      <InputField
        editable
        type="text"
        name="name"
        required
        min="4"
        max="25"
        full
        cls="mb-2 font-semibold"
        defaultValue={product.name}
      />

      <Textarea editable name="about" defaultValue={product.description} cls="mb-3 rounded-md" />
    </>
  );
}

const content = {};

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
