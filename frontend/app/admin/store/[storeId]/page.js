"use client";

import { useContext, useEffect } from "react";
import OrderCard from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";

export default function StoreOrders({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const orders = fakeOrders;

  // console.log("Vew and update store by ID: >>>", params, searchParams);

  useEffect(() => {
    // document.title = "Admin Store products - ALM";
  }, []);

  return (
    <div>
      <ul>
        {orders.map((o, i) => (
          <OrderCard lang={lang} {...o} admin={true} key={i} />
        ))}
      </ul>
    </div>
  );
}

const content = {};

const fakeOrders = [
  {
    customer: "Customer 1",
    lineItems: 10,
    payment: {
      id: 4,
      type: "ON-DELIVERY",
      value: null,
      method: "CASH",
    },
    total: 120,
    currency: "€",
    status: "PENDING",
  },
  {
    customer: "Customer 1",
    lineItems: 2,
    payment: {
      id: 4,
      type: "ONLINE",
      value: null,
      method: "CASH",
    },
    total: 30,
    currency: "€",
    status: "PAID",
  },
  {
    customer: "Customer 1",
    lineItems: 1,
    payment: {
      id: 4,
      type: "ONLINE",
      value: null,
      method: "CARD",
    },
    total: 20,
    currency: "€",
    status: "FAILED",
  },
  {
    customer: "Customer 1",
    lineItems: 1,
    payment: {
      id: 4,
      type: "ON-DELIVERY",
      value: {
        bic: "FJENKXX",
        acountNumber: "ING06B887823483542",
        accountHolder: "Mr Tester",
      },
      method: "BANK",
    },
    total: 20,
    currency: "€",
    status: "CANCELED",
  },
  {
    customer: "Customer 1",
    lineItems: 1,
    payment: {
      id: 4,
      type: "ON-DELIVERY",
      value: null,
      method: "CASH",
    },
    total: 20,
    currency: "€",
    status: "SENT",
  },
];
