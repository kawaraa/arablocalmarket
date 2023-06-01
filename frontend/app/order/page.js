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
import useInfiniteScroll from "../(component)/infinite-scroll-hook";

export default function Orders({ searchParams }) {
  const router = useRouter();
  const { lang, user, addMessage } = useContext(AppSessionContext);
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
      const query = `?filters[customer][user][$eqi]=${user.id}&populate[lineItems]=*&populate[store][fields]=owner,name,meta&populate[payment]=*&pagination[page]=${pageRef.current}&pagination[pageSize]=50&sort=createdAt:desc`;
      const { data, meta } = await request("order", "GET", { query });
      setTotal(meta.pagination.total);
      if (pageRef.current > meta.pagination.pageCount) return [];
      pageRef.current += 1;

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

    if (searchParams.orderId) {
      const query = `/${searchParams.orderId}?populate[lineItems]=*&populate[store][fields]=owner,name,meta&populate[payment]=*`;
      request("order", "GET", { query })
        .catch(() => null)
        .then(({ data }) => {
          data.attributes.id = data.id;
          data.attributes.currency = data.attributes.currency.split("-")[0];
          previewOrder(data.attributes);
        });
    }
  }, []);

  const { data } = useInfiniteScroll({
    onLoadContent: fetchOrders,
    setLoading,
    ready: !!user?.id,
  });

  useEffect(() => {
    if (!user && !user?.loading) router.replace("/signin");
  }, [user]);

  if (!user || user?.loading) return null;
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
