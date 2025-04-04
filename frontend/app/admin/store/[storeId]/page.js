"use client";
import { useContext, useEffect, useRef, useState } from "react";
import OrderDetailsPopup from "../../../(component)/order-details-popup";
import OrderCard from "../../../(component)/order-card";
import { AppSessionContext } from "../../../app-session-context";
import { request } from "../../../(service)/api-provider";
import shdCnt from "../../../(layout)/json/shared-content.json";
import useInfiniteScroll from "../../../(component)/infinite-scroll-hook";
import Loader from "../../../(layout)/loader";

export default function StoreOrders({ params, searchParams }) {
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const [loading, setLoading] = useState(true);
  const [clickedOrder, setClickedOrder] = useState(null);
  const [openOrder, setOpenOrder] = useState(false);
  const pageRef = useRef(1);
  const [total, setTotal] = useState(0);

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
      setTotal(total - 1);
      removeItem(data.findIndex((o) => o.id == orderId));
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
    try {
      const query = `?filters[store][id][$eqi]=${params.storeId}&filters[store][owner][$eqi]=${user.id}&populate[store][fields]=owner&populate[customer]=*&populate[lineItems]=*&populate[payment]=*&pagination[page]=${pageRef.current}&pagination[pageSize]=50&sort=createdAt:desc`;
      const { data, meta } = await request("order", "GET", { query });

      setTotal(meta.pagination.total);
      if (pageRef.current > meta.pagination.pageCount) return [];
      pageRef.current += 1;

      return data.map((order) => {
        order.attributes.id = order.id;
        if (order.attributes.customer?.name?.toLowerCase().includes("pos") && lang != "en") {
          order.attributes.customer.name = shdCnt.customerPos[lang];
        }

        order.attributes.currency = order.attributes.currency.split("-")[0];
        return order.attributes;
      });
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
      return [];
    }
  };

  useEffect(() => {
    document.title = content.title[lang] + " - ALM";
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

  const { data, removeItem } = useInfiniteScroll({
    onLoadContent: fetchOrders,
    setLoading,
    ready: !!user?.id,
  });

  return (
    <>
      <h2 dir="auto" className="text-lg my-4 font-medium lazy-l">
        {shdCnt.foundOrders[lang][0]} <span className="font-bold">( {total} )</span>{" "}
        {shdCnt.foundOrders[lang][1]}
      </h2>

      <ul className="print:hidden">
        {data.map((o, i) => (
          <OrderCard lang={lang} order={o} onClick={previewOrder} onDelete={deleteOrder} admin key={i} />
        ))}
      </ul>

      {loading && <Loader size="30" wrapperCls="my-5" />}

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

const content = { title: { en: "Admin Store orders", ar: "طلبات مسؤل ومشرف المتجر" } };
