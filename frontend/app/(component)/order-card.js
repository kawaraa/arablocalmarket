"use client";
// import Order from "./order";
// import Customer from "./customer";

export default function OrderCard({ id, items, admin }) {
  console.log("OrderList: >>>", items);

  // Todo: When the user can click on the order item, it should see a popup card with all the details
  // Todo: put the Order component inside a modal to popup.
  return (
    <li>
      <p>{items.length}</p>

      {/* // This should be an Avatar or User Icon where the user can click on and see a popup card with all the details
            // Todo: put the Customer component inside a modal to popup. */}
      {admin && <div>User Icon</div>}
    </li>
  );
}
