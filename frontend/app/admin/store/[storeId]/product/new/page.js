"use client";
import { useEffect } from "react";

export default function ProductById({ params, searchParams }) {
  console.log("Product ID, Name or title: ", params.slug);

  useEffect(() => {
    document.title = "Product Name / title - store name - ALM";
    window.scroll(0, 230);
  }, []);

  // title, description, images, featuredImageId, category, vendor,
  // variants: barcode, imageId, price, comparePrice, quantity, weight, weightUnit, options: name, value
  return (
    <form className="">
      <h1>New product page!</h1>
      <p>Here will show a single product for a store to the public.</p>
    </form>
  );
}

const content = {};
