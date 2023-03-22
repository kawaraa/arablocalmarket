"use client";
import { useEffect, useState } from "react";
import UpdateProduct from "../new/page";

// Todo Think of view, create and update product admin page
// Can the admin review and update the product at the same time?
// Create button should be easy to reach?

export default function ProductById({ params, searchParams }) {
  console.log("Product ID, Name or title: ", params.slug);
  const [product, setProduct] = useState({});

  useEffect(() => {
    document.title = "Product Name / title - store name - ALM";
    window.scroll(0, 230);
  }, []);

  return <UpdateProduct {...product} />;
}

const content = {};
