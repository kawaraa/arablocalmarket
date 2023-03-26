"use client";
import { useEffect } from "react";
import OrderCard from "../(component)/order-card";

export default function Orders(props) {
  const orders = [];

  useEffect(() => {
    document.title = "Orders - ALM";
  }, []);

  return (
    <div>
      <h1 className="">Orders!</h1>

      <section>
        <h3>Store 1 name</h3>

        <ul>
          {orders.map((o, i) => (
            <OrderCard {...o} key={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}

const content = {};
