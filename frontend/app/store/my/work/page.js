"use client";
import { useEffect } from "react";
import Store from "../../../(component)/store";

export default function WorkStores() {
  useEffect(() => {
    document.title = "Work Stores - ALM";
  }, []);

  return (
    <div>
      <h1>Hello from work stores page!</h1>
      <p>Here show the stores I work at.</p>
      <div className="flex">
        <Store />
        <Store />
        <Store />
      </div>
    </div>
  );
}
