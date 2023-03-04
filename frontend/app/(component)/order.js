"use client";

export default function Order({ order, customer }) {
  console.log("Order: >>>", props);

  return (
    <div>
      <h1>Order!</h1>
      {/* <p>{order.items.length}</p> */}
      <div>{customer}</div>
    </div>
  );
}
