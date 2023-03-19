"use client";

import { useContext, useEffect, useState } from "react";
import Badge from "../../../(component)/(styled)/badge";
import Modal from "../../../(component)/(styled)/modal";
import SvgIcon from "../../../(component)/(styled)/svg-icon";
import LineItems from "../../../(component)/line-items";
import OrderCard, { content as oContent } from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";

export default function StoreOrders({ params, searchParams }) {
  const { lang, user } = useContext(AppSessionContext);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);
  const orders = fakeOrders;

  // console.log("Vew and update store by ID: >>>", params, searchParams);

  const clearSelectedOrder = () => {
    setModalOpen(false);
    setTimeout(() => setClickedOrder(null), 300);
  };

  const selectOrder = (order) => {
    setClickedOrder(order);
    setTimeout(() => setModalOpen(true), 300);
  };

  useEffect(() => {
    // document.title = "Admin Store products - ALM";
  }, []);

  return (
    <div>
      <ul className="print:hidden">
        {orders.map((o, i) => (
          <OrderCard lang={lang} {...o} onClick={selectOrder} admin={true} key={i} />
        ))}
      </ul>

      <Modal
        tag="section"
        title="Order details"
        open={modalOpen}
        onCancel={clearSelectedOrder}
        okBtn={content.okBtn[lang]}
        onApprove={user?.admin ? window.print : null}>
        {clickedOrder && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold px-1 mr-3 border rounded print:text-3xl">
                {clickedOrder.id}
              </span>
              <Badge
                text={oContent.status[clickedOrder.status][lang] || clickedOrder.status}
                color={oContent.status[clickedOrder.status].color}
                cls="text-sm"
              />
            </div>

            <LineItems bill items={clickedOrder.lineItems} currency={clickedOrder.currency} />

            <p className="mt-3 pt-2 border-t-[1px] border-bc flex justify-between">
              {clickedOrder?.payment && (
                <span className="print:text-3xl print:!font-bold">
                  {oContent.payment[clickedOrder.payment.type][lang] || clickedOrder.payment.type}{" "}
                  {oContent.payment[clickedOrder.payment.method][lang] || clickedOrder.payment.method}
                </span>
              )}
              <span className="text-lg font-semibold text-red print:text-3xl">
                {clickedOrder.discount > 0 && (
                  <span className="mr-2 line-through">
                    {clickedOrder.currency}
                    {clickedOrder.discount + clickedOrder.total}
                  </span>
                )}
                {clickedOrder.currency}
                {clickedOrder.total}
              </span>
            </p>
            {user?.admin && (
              <address
                dir="ltr"
                className="relative card mt-5 px-2 py-1 rounded-md print:text-3xl print:mt-20">
                <h6 className="font-medium">
                  {clickedOrder.customer.firstName} {clickedOrder.customer.lastName}
                </h6>
                <a
                  href={
                    "http://maps.google.com/?q=" +
                    (clickedOrder.customer.address.currentLat
                      ? `${clickedOrder.customer.address.currentLat},${clickedOrder.customer.address.currentLng}`
                      : `${clickedOrder.customer.address.line1},${
                          clickedOrder.customer.address.line2 || ""
                        },${clickedOrder.customer.address.postalCode},${clickedOrder.customer.address.city},${
                          clickedOrder.customer.address.country
                        }`)
                  }
                  target="_blank"
                  className="w-8 absolute top-2 right-2 text-pc2 hover:text-red">
                  <SvgIcon name="location" />
                </a>
                <p>
                  {clickedOrder.customer.address.line1} {clickedOrder.customer.address.line2 || ""},<br />
                  {clickedOrder.customer.address.postalCode} {clickedOrder.customer.address.city},
                  <br />
                  {clickedOrder.customer.address.province} {clickedOrder.customer.address.country}
                </p>
              </address>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

const content = {
  okBtn: { en: "Print", ar: "طباعة" },
};

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
