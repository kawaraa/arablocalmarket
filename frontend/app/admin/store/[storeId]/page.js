"use client";

import { useEffect } from "react";

export default function StoreById({ params, searchParams }) {
  console.log("Vew and update store by ID: >>>", params, searchParams);

  useEffect(() => {
    // document.title = "Admin Store products - ALM";
  }, []);

  return (
    <div>
      <h1></h1>
      <p>Here will show the store by ID to the admin Or the store by ID to the employee.</p>
      <p>Show Products tab.</p>
      <p>Show Orders tab.</p>
      <p>If admin, Show Employees tab.</p>
    </div>
  );
}

const content = {};
