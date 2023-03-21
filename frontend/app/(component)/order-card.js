"use client";
import Badge from "./(styled)/badge";
import SvgIcon from "./(styled)/svg-icon";

export default function OrderCard({ lang, admin, onClick, ...order }) {
  // console.log("OrderList: >>>", order);

  return (
    <li
      onClick={() => onClick(order)}
      className="card p-2 my-2 bg-cbg rounded-md cursor-pointer cd_hr md:flex">
      <div className="flex justify-between items-center">
        {admin && (
          <h3 className="flex-auto">
            <span className="inline-block w-3.5 mr-2">
              <SvgIcon name="avatar" />
            </span>
            {order.customer.firstName} {order.customer.lastName}
          </h3>
        )}

        <span className="text-sm font-semibold px-1 mr-3 border rounded">{order.id}</span>
        <Badge
          text={content.status[order.status][lang] || order.status}
          color={content.status[order.status].color}
          cls="text-sm"
        />
      </div>

      <p dir="auto" className="flex justify-between my-3 ">
        <span className="text-sm font-semibold">
          {content.payment[order.payment.method][lang] || order.payment.method}{" "}
          {content.payment[order.payment.type][lang] || order.payment.type}
        </span>
        <span>
          <span className="mx-2">( {order.lineItems.length} )</span>
          <span className="text-red">{order.currency + order.total}</span>
        </span>
      </p>
    </li>
  );
}

export const content = {
  payment: {
    "ON-DELIVERY": { ar: "عند التسليم", color: 1 },
    ONLINE: { ar: "عبر الإنترنت", color: 2 },
    CASH: { ar: "نقدي", color: 3 },
    CARD: { ar: "بطاقة", color: 4 },
    BANK: { ar: "تحويل", color: 5 },
  },
  status: {
    PENDING: { ar: "معلق", color: 1 },
    PAID: { ar: "مدفوع", color: 2 },
    FAILED: { ar: "فشل", color: 3 },
    CANCELED: { ar: "تم إلغاؤه", color: 4 },
    SENT: { ar: "تم إرساله", color: 5 },
    DELIVERED: { ar: "تم التوصيل", color: 6 },
    RETURNED: { ar: "تم إرجاعه", color: 7 },
    ARCHIVED: { ar: "مؤرشف", color: 8 },
  },
};
