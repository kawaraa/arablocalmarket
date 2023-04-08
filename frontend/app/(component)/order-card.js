"use client";
import Badge from "./(styled)/badge";
import shdCnt from "../(layout)/json/shared-content.json";
import SvgIcon from "./(styled)/svg-icon";
// import { getCssDelay } from "../(service)/style-methods";

export default function OrderCard({ lang, admin, onClick, ...order }) {
  return (
    <li
      onClick={() => onClick(order)}
      // style={getCssDelay()}
      className="card p-2 my-2 bg-cbg rounded-md cursor-pointer cd_hr md:flex lazy-c">
      <div className="flex justify-between items-center">
        {admin && (
          <h3 className="flex-auto">
            <span className="inline-block w-3.5 mr-2">
              <SvgIcon name="avatar" />
            </span>
            {order.customer?.name}
          </h3>
        )}

        <span className="text-sm font-semibold px-1 mr-3 border rounded">{order.id}</span>
        <Badge
          text={shdCnt.status[order.status][lang] || order.status}
          color={shdCnt.status[order.status].color}
          cls="text-sm"
        />
      </div>

      <p dir="auto" className="flex justify-between my-3 ">
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
