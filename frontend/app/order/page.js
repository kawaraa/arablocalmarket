"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { request } from "../(service)/api-provider";
import OrderCard from "../(component)/order-card";
import OrderDetailsPopup from "../(component)/order-details-popup";
import EmptyState from "../(component)/(styled)/empty-state";
// import ComboBox from "../(component)/combobox";

export default function Orders(props) {
  const router = useRouter();
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [orders, setOrders] = useState([]);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);

  const previewOrder = (order) => {
    setClickedOrder(order);
    setTimeout(() => setOpenOrder(true), 300);
  };

  const fetchOrders = async () => {
    setAppLoading(true);
    try {
      const query = `?filters[customer][user][$eq]=${user.id}&populate[lineItems]=*&populate[store][fields]=owner,name,meta`;
      const { data } = await request("order", "GET", { query });
      setOrders(
        data.map((o) => {
          o.attributes.id = o.id;
          o.attributes.currency = o.attributes.currency.split("-")[0];
          return o.attributes;
        })
      );
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    document.title = "Admin Orders - ALM";
    if (!user) router.replace("/signin");
    else fetchOrders();
  }, [user]);

  if (!user) return null;
  return (
    <>
      <h1 className="my-5 text-xl">
        {content.h1[lang]} ( {orders.length} )
      </h1>

      {!orders[0] ? (
        <EmptyState lang={lang} type="no" />
      ) : (
        <ul>
          {orders.map((o, i) => (
            <OrderCard lang={lang} {...o} onClick={previewOrder} key={i} />
          ))}
        </ul>
      )}

      <OrderDetailsPopup lang={lang} open={openOrder} onClose={() => setOpenOrder(false)} {...clickedOrder} />
    </>
  );
}

const content = {
  h1: { en: "orders", ar: "الطلبات" },
};
