"use client";

import { useEffect } from "react";

export default function Customer(props) {
  console.log("Orders: >>>", props);

  useEffect(() => {
    document.title = "Orders - ALM";
  }, []);

  // Todo: Use the search query to read the order ID.

  return (
    <div>
      <h1>Customers!</h1>
    </div>
  );
}

const content = {};
