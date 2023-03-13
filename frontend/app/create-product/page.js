"use client";

export default function CreateStore({ params, searchParams }) {
  console.log("CreateStore: >>>", params, searchParams);

  return (
    <form>
      <h1 className="text-xl text-center mt-8 mb-5">Create store form</h1>
      Image, featuredImageId, Title / Name, description, vendor, category, variants: image / imageId, barcode,
      options: name, value, price, comparePrice, quantity, weight, weightUnit, position,
    </form>
  );
}
