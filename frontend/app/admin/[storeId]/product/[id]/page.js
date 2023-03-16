"use client";
// http://localhost:3000/store/1/product/1
// http://localhost:3000/store/1/product/product-name
// http://localhost:3000/store/1/product/product-title

export default function ProductById({ params, searchParams }) {
  console.log("Product ID, Name or title: ", params.slug);

  useEffect(() => {
    document.title = "Product Name / title - store name - ALM";
  }, []);

  return (
    <div>
      <h1>Public store Product page!</h1>
      <p>Here will show a single product for a store to the public.</p>
    </div>
  );
}

const content = {};
