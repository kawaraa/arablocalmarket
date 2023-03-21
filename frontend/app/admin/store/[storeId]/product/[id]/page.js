"use client";

import { useEffect } from "react";

// http://localhost:3000/store/1/product/1
// http://localhost:3000/store/1/product/product-name
// http://localhost:3000/store/1/product/product-title

// Todo Think of view, create and update product admin page
// Can the admin review and update the product at the same time?
// Create button should be easy to reach?

export default function ProductById({ params, searchParams }) {
  console.log("Product ID, Name or title: ", params.slug);

  useEffect(() => {
    document.title = "Product Name / title - store name - ALM";
    window.scroll(0, 230);
  }, []);

  return (
    <div>
      <h1>Product by ID page!</h1>
      <p>Here will show a single product for a store to the public.</p>
    </div>
  );
}

const content = {};
