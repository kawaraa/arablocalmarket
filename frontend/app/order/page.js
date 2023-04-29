"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { request } from "../(service)/api-provider";
import shdCnt from "../(layout)/json/shared-content.json";
import OrderCard from "../(component)/order-card";
import OrderDetailsPopup from "../(component)/order-details-popup";
import EmptyState from "../(component)/(styled)/empty-state";
import Loader from "../(layout)/loader";
import infiniteScroll from "../(component)/infinite-scroll";

export default function Orders(props) {
  const router = useRouter();
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const pageRef = useRef(1);
  const [total, setTotal] = useState(0);

  const previewOrder = (order) => {
    setClickedOrder(order);
    setTimeout(() => setOpenOrder(true), 300);
  };

  const fetchOrders = async () => {
    try {
      const query = `?filters[customer][user][$eq]=${user.id}&populate[lineItems]=*&populate[store][fields]=owner,name,meta&populate[payment]=*&pagination[page]=${pageRef.current}&pagination[pageSize]=50&sort=createdAt:desc`;
      const { data, meta } = await request("order", "GET", { query });
      pageRef.current += 1;
      setTotal(meta.pagination.total);

      return data.map((o) => {
        o.attributes.id = o.id;
        o.attributes.currency = o.attributes.currency.split("-")[0];
        return o.attributes;
      });
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
      return [];
    }
  };

  useEffect(() => {
    document.title = "Admin Orders - ALM";
    if (!user) router.replace("/signin");
  }, [user]);

  const { data } = infiniteScroll({
    onLoadContent: fetchOrders,
    setLoading,
    ready: !!user?.id,
  });

  if (!user) return null;
  return (
    <>
      <h1 dir="auto" className="text-lg my-5 font-medium lazy-l">
        {shdCnt.foundOrders[lang][0]} <span className="font-bold">( {total} )</span>{" "}
        {shdCnt.foundOrders[lang][1]}
      </h1>

      {!data[0] ? (
        <EmptyState lang={lang} type="no" />
      ) : (
        <ul>
          {data.map((o, i) => (
            <OrderCard lang={lang} order={o} onClick={previewOrder} key={i} />
          ))}
        </ul>
      )}

      {loading && <Loader size="30" wrapperCls="my-5" />}

      <OrderDetailsPopup lang={lang} open={openOrder} onClose={() => setOpenOrder(false)} {...clickedOrder} />
    </>
  );
}

const content = {
  h1: { en: "orders", ar: "الطلبات" },
};
