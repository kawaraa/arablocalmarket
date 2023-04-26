"use client";
import { useContext, useEffect, useState } from "react";
import OrderDetailsPopup from "../../../(component)/order-details-popup";
import OrderCard from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";
import { request } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";

export default function StoreOrders({}) {
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const [orders, setOrders] = useState([]);

  const clearSelectedOrder = () => {
    setOpenOrder(false);
    setTimeout(() => setClickedOrder(null), 300);
  };

  const previewOrder = (order) => {
    setClickedOrder(order);
    setTimeout(() => setOpenOrder(true), 300);
  };

  const deleteOrder = async (orderId) => {
    setAppLoading(true);
    try {
      await request("order", "DELETE", { query: `/${orderId}` });
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
      setOrders(orders.filter((o) => o.id != orderId));
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };

  const handleChange = async ({ name, value }) => {
    setAppLoading(true);
    try {
      const body = { data: { [name]: value } };
      await request("order", "PUT", { query: `/${clickedOrder?.id}`, body });
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 2 });
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }

    setClickedOrder({ ...clickedOrder, [name]: value });
    setAppLoading(false);
  };

  const fetchOrders = async () => {
    setAppLoading(true);
    try {
      const query = `?filters[store][owner][$eq]=${user.id}&populate[store][fields]=owner&populate[customer]=*&populate[lineItems]=*&populate[payment]=*`;
      const { data } = await request("order", "GET", { query });
      data.forEach((d) => {
        if (d.attributes.customer?.name?.toLowerCase().includes("pos") && lang != "en") {
          d.attributes.customer.name = shdCnt.customerName[lang];
        }
        d.attributes.currency = d.attributes.currency.split("-")[0];
      });

      setOrders(data.sort((a, b) => Date.parse(b.attributes.createdAt) - Date.parse(a.attributes.createdAt)));
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    document.title = "Admin Store orders - ALM"; // Todo: translate
    fetchOrders();
  }, []);

  return (
    <>
      <ul className="print:hidden">
        {orders.map((o, i) => (
          <OrderCard
            lang={lang}
            id={o.id}
            {...o.attributes}
            onClick={previewOrder}
            onDelete={deleteOrder}
            admin
            key={i}
          />
        ))}
      </ul>

      <OrderDetailsPopup
        lang={lang}
        open={openOrder}
        onClose={clearSelectedOrder}
        onChange={handleChange}
        {...clickedOrder}
        admin
      />
    </>
  );
}

const content = {};
