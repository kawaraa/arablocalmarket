"use client";
import { useEffect } from "react";
import Store from "../store";

export default function MyStores() {
  useEffect(() => {
    document.title = "My Stores - ALM";
  }, []);

  return (
    <div>
      <h1>Hello from my stores page!</h1>
      <Store />
      <Store />
    </div>
  );
}
