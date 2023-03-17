"use client";

import { useEffect } from "react";
import OrderCard from "../../../(component)/order-card";

export default function StoreOrders({ params, searchParams }) {
  const orders = [{ items: ["a", "b"] }];

  console.log("Vew and update store by ID: >>>", params, searchParams);

  useEffect(() => {
    // document.title = "Admin Store products - ALM";
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((o, i) => (
          <OrderCard {...o} admin={true} key={i} />
        ))}
      </ul>
    </div>
  );
}

const content = {};
