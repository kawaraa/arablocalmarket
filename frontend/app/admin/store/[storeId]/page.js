"use client";
import { useContext, useEffect, useState } from "react";
import OrderDetailsPopup from "../../../(component)/order-details-popup";
import OrderCard from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";
import { request } from "../../../(service)/api-provider";

export default function StoreOrders({ params, searchParams }) {
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const [orders, setOrders] = useState([]);

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

  const fetchOrders = async () => {
    setAppLoading(true);
    try {
      const query = `?filters[store][owner][$eq]=${user.id}&populate=customer,lineItems,payment`;
      const { data } = await request("order", "GET", { query });
      data.forEach((d) => (d.attributes.currency = d.attributes.currency.split("-")[0]));
      setOrders(data);
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
    <div>
      <ul className="print:hidden">
        {orders.map((o, i) => (
          <OrderCard lang={lang} id={o.id} {...o.attributes} onClick={selectOrder} admin key={i} />
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
