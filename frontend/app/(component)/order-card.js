"use client";
import Badge from "./(styled)/badge";
import shdCnt from "../(layout)/json/shared-content.json";
import SvgIcon from "./(styled)/svg-icon";
import Link from "next/link";
import { getCssDelay } from "../(service)/style-methods";
import { IconButton } from "./(styled)/button";

export default function OrderCard({ lang, admin, onClick, style = getCssDelay(), onDelete, order }) {
  const handleClick = (e) => {
    if (e.target.tagName == "A") return;

    // Todo: remove delete functionality, use archive instead
    if (e.target.name == "delete" && admin) return onDelete(order.id);
    onClick(order);
  };

  return (
    <li
      dir="auto"
      onClick={handleClick}
      style={style}
      className="card px-2 py-3 my-2 bg-cbg rounded-md cursor-pointer cd_hr lazy-b">
      {!admin && order.store.data && (
        <StoreHeaderInfo
          id={order.store.data.id}
          name={order.store.data.attributes.name}
          phone={order.store.data.attributes?.meta?.phone}
          cls="mb-3"
        />
      )}
      <div className="md:flex md:justify-between">
        <div dir="ltr" className="flex justify-between items-center">
          {admin && (
            <>
              <User Tag="h3" name={order.customer?.name || shdCnt.deletedCustomer[lang]} />
              <span className="flex-1"></span>
            </>
          )}
          <span className="text-sm font-semibold px-1 border rounded">{order.id}</span>
          <Badge
            text={shdCnt.status[order.status][lang] || order.status}
            color={shdCnt.status[order.status].color}
            cls={`text-sm ${!admin ? "md:ml-2" : "mx-3"}`}
          />
        </div>

        <p dir="auto" className="flex justify-between mt-4 md:mt-0">
          <span className="text-sm font-semibold">
            {shdCnt.payment[order.payment.method][lang] || order.payment.method}{" "}
            {shdCnt.payment[order.payment.type][lang] || order.payment.type}
          </span>
          <span>
            <span className="mx-2">( {order.lineItems.length} )</span>
            <span className="text-red">{order.currency + order.total}</span>
          </span>
        </p>
      </div>
      {/* {admin && <IconButton icon="bin" name="delete" cls="w-8 text-red" />} */}
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
  const c = "hover:text-link duration-150";
  return (
    <div
      className={`pb-2 flex justify-between items-center border-b-[1px] border-bc dark:border-bf ${
        cls || ""
      }`}>
      {children}

      <Link passHref legacyBehavior href={"/store/" + id}>
        <a className={"font-medium mx-2 " + c}>{name}</a>
      </Link>

      <span className="flex-auto"></span>
      {phone && (
        <>
          <a className={"w-6 mx-2 " + c} href={"tel:" + phone}>
            <SvgIcon name="phone" />
          </a>
          <span className="w-2"></span>
          <a
            href={"https://wa.me/" + phone}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            aria-label="WhatsApp"
            className={"w-7 text-green dark:text-pc " + c}>
            <SvgIcon name="whatsapp" />
          </a>
        </>
      )}
    </div>
  );
}
