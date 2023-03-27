"use client";

import { useContext, useEffect, useState } from "react";
import OrderDetailsPopup from "../../../(component)/order-details-popup";
import OrderCard from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";

export default function StoreOrders({ params, searchParams }) {
  const { lang, user } = useContext(AppSessionContext);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const orders = fakeOrders;

  // console.log("Vew and update store by ID: >>>", params, searchParams);

  const clearSelectedOrder = () => {
    setOpenOrder(false);
    setTimeout(() => setClickedOrder(null), 300);
  };

  const selectOrder = (order) => {
    setClickedOrder(order);
    setTimeout(() => setOpenOrder(true), 300);
  };

  const handleStatusChange = ({ target: { value } }) => {
    // console.log(value);
    setClickedOrder({ ...clickedOrder, status: value });
  };

  useEffect(() => {
    // document.title = "Admin Store orders - ALM";
  }, []);

  return (
    <div>
      <ul className="print:hidden">
        {orders.map((o, i) => (
          <OrderCard lang={lang} {...o} onClick={selectOrder} admin key={i} />
        ))}
      </ul>

      <OrderDetailsPopup
        lang={lang}
        open={openOrder}
        onClose={clearSelectedOrder}
        onStatusChange={handleStatusChange}
        {...clickedOrder}
        admin></OrderDetailsPopup>
    </div>
  );
}

const content = {};

// { accountHolder: "Mr Tester", acountNumber: "ING06B887823483542", bic: "FJENKXX" }
const fakeLineItem = {
  productNumber: "1324",
  barcode: "435672546457",
  title: "Tea - small",
  image: "/burger-prepared-food-clipart.png",
  price: 12,
  discount: 0,
  quantity: 1,
};
const fakeCustomer = {
  firstName: "Mr",
  lastName: "Tester",
  phone: "",
  address: {
    line1: "Street 1",
    line2: "B",
    city: "Amsterdam",
    postalCode: "1017 EE",
    province: "North Holland",
    country: "Netherlands",
    currentLat: "52.370216",
    currentLng: "4.895168",
  },
};

const fakeOrders = [
  {
    id: 131,
    customer: fakeCustomer,
    lineItems: [fakeLineItem, fakeLineItem, fakeLineItem],
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
    id: 435,
    customer: fakeCustomer,
    lineItems: [fakeLineItem],
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
    id: 564,
    customer: fakeCustomer,
    lineItems: [fakeLineItem, fakeLineItem],
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
    id: 923,
    customer: fakeCustomer,
    lineItems: [fakeLineItem, fakeLineItem, fakeLineItem, fakeLineItem],
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
    id: 763,
    customer: fakeCustomer,
    lineItems: [fakeLineItem, fakeLineItem],
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
