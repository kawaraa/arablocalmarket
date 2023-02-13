"use client";

import { useEffect } from "react";
import Store from "../../(component)/store";

export default function MyStores() {
  useEffect(() => {
    document.title = "My Stores - ALM";
  }, []);

  return (
    <div>
      <h1>Hello from my stores page!</h1>
      <div className="flex">
        <Store />
        <Store />
      </div>
    </div>
  );
}
