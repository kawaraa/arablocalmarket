"use client";

import { useEffect } from "react";

// http://localhost:3000/store/1/product
// http://localhost:3000/store/1/product
// http://localhost:3000/store/1/product

export default function StoreProducts(props) {
  console.log("Products: >>>", props);

  useEffect(() => {
    document.title = "Store Name / title products - ALM";
  }, []);

  return (
    <div>
      <h1>Private Store Products page!</h1>
      <p>Here will show Private Products by store.</p>
    </div>
  );
}

const content = {};
