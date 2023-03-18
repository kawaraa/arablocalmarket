"use client";

import Badge from "./(styled)/badge";

// import Order from "./order";
// import Customer from "./customer";

export default function OrderCard({ lang, admin, ...order }) {
  console.log("OrderList: >>>", order.lineItems);
  // {"accountHolder":"Mr Tester", "acountNumber":"ING06B887823483542", "bic":"FJENKXX"}
  // Todo: When the user can click on the order item, it should see a popup card with all the details
  // Todo: put the Order component inside a modal to popup.
  return (
    <li className="card md:flex">
      <div className="flex">
        <h3>{order.customer}</h3>
        <p>{order.lineItems}</p>
      </div>

      <p className="font-bold">
        {order.payment.type}
        <span className="mx-2">{order.payment.method}</span>
      </p>

      <div className="flex">
        <p>{order.currency + order.total}</p>

        <Badge
          text={content.status[order.status][lang] || order.status}
          color={content.status[order.status].color}
        />
      </div>
      {/* // This should be an Avatar or User Icon where the user can click on and see a popup card with all the details
            // Todo: put the Customer component inside a modal to popup. */}
      {admin && <div>User Icon</div>}
    </li>
  );
}

const content = {
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

let o = {
  customer: "Customer 1",
  lineItems: 10,
  paymentMethod: "on-delivery",
  total: 120,
  currency: "€",
  status: "PENDING",
};
