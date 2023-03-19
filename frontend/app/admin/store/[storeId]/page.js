"use client";

import { useContext, useEffect, useState } from "react";
import Badge from "../../../(component)/(styled)/badge";
import Modal from "../../../(component)/(styled)/modal";
import OrderCard, { content as oContent } from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";

export default function StoreOrders({ params, searchParams }) {
  const { lang } = useContext(AppSessionContext);
  const [clickedOrder, setClickedOrder] = useState(null);
  const orders = fakeOrders;

  // console.log("Vew and update store by ID: >>>", params, searchParams);

  useEffect(() => {
    // document.title = "Admin Store products - ALM";
  }, []);

  return (
    <div>
      <ul>
        {orders.map((o, i) => (
          <OrderCard lang={lang} {...o} onClick={setClickedOrder} admin={true} key={i} />
        ))}
      </ul>

      <Modal
        tag="section"
        title="Order details"
        open={!!clickedOrder}
        onCancel={() => setClickedOrder(null)}
        // okBtn={content.okBtn[lang]}
      >
        {clickedOrder && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold px-1 mr-3 border rounded">{clickedOrder.id}</span>
              <Badge
                text={oContent.status[clickedOrder.status][lang] || clickedOrder.status}
                color={oContent.status[clickedOrder.status].color}
                cls="text-sm"
              />
            </div>
            <ul>
              <li></li>
            </ul>
            {/*  order.lineItems order.currency, order.total, order.discount, order.payment, order.customer, order.addressId */}
            {/* if it's admin, show the customer info, else just the address */}
          </>
        )}
      </Modal>
    </div>
  );
}

const content = {
  okBtn: { en: "Save", ar: "حفظ" },
};

const fakeOrders = [
  {
    id: 131,
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
    id: 435,
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
    id: 564,
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
    id: 923,
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
    id: 763,
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
