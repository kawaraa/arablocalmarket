"use client";
import Badge from "./(styled)/badge";
import shdCnt from "../(layout)/json/shared-content.json";
import SvgIcon from "./(styled)/svg-icon";
import Link from "next/link";
// import { getCssDelay } from "../(service)/style-methods";

export default function OrderCard({ lang, admin, onClick, ...order }) {
  const handleClick = (e) => {
    if (e.target.tagName == "A") return;
    onClick(order);
  };
  return (
    <li
      dir="auto"
      onClick={handleClick}
      // style={getCssDelay()}
      className="card px-2 py-3 my-2 bg-cbg rounded-md cursor-pointer cd_hr md:flex lazy-c">
      {!admin && (
        <StoreHeaderInfo
          id={order.store.data.id}
          name={order.store.data.attributes.name}
          phone={order.store.data.attributes?.meta?.phone}
          cls="mb-3"
        />
      )}

      <div dir="auto" className="flex justify-between items-center">
        {admin && (
          <>
            <User Tag="h3" name={order.customer?.name} />
            <span className="flex-1"></span>
          </>
        )}
        <Badge
          text={shdCnt.status[order.status][lang] || order.status}
          color={shdCnt.status[order.status].color}
          cls={`text-sm ${!admin ? "" : "mx-3"}`}
        />
        <span className="text-sm font-semibold px-1 border rounded">{order.id}</span>
      </div>

      <p dir="auto" className="flex justify-between mt-4">
        <span className="text-sm font-semibold">
          {shdCnt.payment[order.payment.method][lang] || order.payment.method}{" "}
          {shdCnt.payment[order.payment.type][lang] || order.payment.type}
        </span>
        <span>
          <span className="mx-2">( {order.lineItems.length} )</span>
          <span className="text-red">{order.currency + order.total}</span>
        </span>
      </p>
    </li>
  );
}

export function User({ Tag, name, cls }) {
  return (
    <Tag className={` ${cls || ""}`}>
      <span className="inline-block w-3.5">
        <SvgIcon name="avatar" />
      </span>
      <span className="mx-2">{name}</span>
    </Tag>
  );
}

export function StoreHeaderInfo({ children, id, name, phone, cls }) {
  const c = "hover:text-pc2 duration-150";
  return (
    <div
      className={`pb-2 flex justify-between items-center border-b-[1px] border-bc dark:border-bf ${
        cls || ""
      }`}>
      {children}

      <Link href={"/store/" + id} className={"font-medium mx-2 " + c}>
        {name}
      </Link>

      <span className="flex-auto"></span>
      {phone && (
        <>
          <a className={"w-5 mx-2 " + c} href={"tel:" + phone}>
            <SvgIcon name="phone" />
          </a>
          <a
            href={"https://wa.me/" + phone}
            target="_blank"
            title="WhatsApp"
            aria-label="WhatsApp"
            className={"w-6 text-green dark:text-pc " + c}>
            <SvgIcon name="whatsapp" />
          </a>
        </>
      )}
    </div>
  );
}
