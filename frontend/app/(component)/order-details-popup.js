"use client";
import shdCnt from "../(layout)/json/shared-content.json";
import Modal from "./(styled)/modal";
import Badge from "./(styled)/badge";
import SvgIcon from "./(styled)/svg-icon";
import LineItems from "./line-items";
import { Textarea, ToggleSwitch } from "./(styled)/inputs";
import { useState } from "react";

export default function OrderDetails({ lang, open, onClose, onStatusChange, admin, printable, ...order }) {
  const [print, setPrint] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    try {
      // Todo: checkout >>> fetch()
      if (print) {
        // Todo: print the order

        // const printWindow = window.open("", "", "width=200,height=100");
        // printWindow.document.write("<p>This window's name is: printWindow </p>");
        // printWindow.print();
        // printWindow.close();

        window.print();
        console.log("Printed");
      }
      // Todo: clear the items

      console.log();
      // admin ? () => window.print() : null
    } catch (error) {
      console.log("handleCheckout Error: >>>", error);
    }

    setLoading(false);
    onClose();
  };

  return (
    <Modal
      title={content.modalTitle[lang]}
      open={open}
      onCancel={onClose}
      okBtn={printable ? shdCnt.checkout[lang] : shdCnt.print[lang]}
      onApprove={admin ? handleCheckout : null}
      loading={loading}>
      {order && order.lineItems && order.lineItems[0] && (
        <>
          <div className="flex justify-between items-center mb-8">
            {order.id && (
              <span className="text-sm font-semibold px-1 mr-3 border rounded print:text-3xl">
                {order.id}
              </span>
            )}
            <label htmlFor="order-status" className="relative inline-flex rounded-full">
              <Badge
                text={shdCnt.status[order.status][lang] || order.status}
                color={shdCnt.status[order.status].color}
                cls="text-sm"
              />
              <select
                name="orderStatus"
                id="order-status"
                onChange={onStatusChange}
                className="absolute inset-0 appearance-none text-[transparent] bg-[transparent] rounded-full print:hidden">
                {Object.keys(shdCnt.status).map((k, i) => (
                  <option value={k} key={i}>
                    {shdCnt.status[k][lang] || k}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <LineItems
            bill
            items={order.lineItems}
            currency={order.currency}
            onRemove={printable ? order.onRemoveItem : null}
          />

          <p className="mt-3 pt-2 border-t-[1px] border-bc flex justify-between">
            {order?.payment && (
              <span className="print:text-3xl print:!font-bold">
                {shdCnt.payment[order.payment.type][lang] || order.payment.type}{" "}
                {shdCnt.payment[order.payment.method][lang] || order.payment.method}
              </span>
            )}
            <span className="text-lg font-semibold text-red print:text-3xl">
              {+order.discount > 0 && (
                <span className="mr-2 line-through">
                  {order.currency}
                  {order.discount + order.total}
                </span>
              )}
              {order.currency}
              {order.total}
            </span>
          </p>
          {admin && order.customer && (
            <address dir="ltr" className="relative card mt-5 px-2 py-1 rounded-md print:text-3xl print:mt-20">
              <h6 className="font-medium">
                {order.customer.firstName} {order.customer.lastName}
              </h6>
              <a
                href={
                  "http://maps.google.com/?q=" +
                  (order.customer.address.currentLat
                    ? `${order.customer.address.currentLat},${order.customer.address.currentLng}`
                    : `${order.customer.address.line1},${order.customer.address.line2 || ""},${
                        order.customer.address.postalCode
                      },${order.customer.address.city},${order.customer.address.country}`)
                }
                target="_blank"
                className="w-8 absolute top-2 right-2 text-pc2 hover:text-red">
                <SvgIcon name="location" />
              </a>
              <p>
                {order.customer.address.line1} {order.customer.address.line2 || ""},<br />
                {order.customer.address.postalCode} {order.customer.address.city},
                <br />
                {order.customer.address.province} {order.customer.address.country}
              </p>
            </address>
          )}
          {admin && <Textarea editable defaultValue={order.note} cls="mt-5" />}

          {printable && (
            <ToggleSwitch
              checked={print}
              onCheck={(e) => setPrint(e.checked)}
              cls="w-full mt-3 flex justify-between">
              <span className="ml-3 text-sm font-medium">Print after checkout</span>
              <span className="w-2"></span>
            </ToggleSwitch>
          )}
        </>
      )}
    </Modal>
  );
}

const content = {
  modalTitle: { en: "Order details", ar: "تفاصيل الطلب" },
};
