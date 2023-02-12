"use client";

import Customer from "../../../customer";

export default function Orders(props) {
  console.log("Orders: >>>", props);
  const orders = [{ items: ["a", "b"] }];
  useEffect(() => {
    document.title = "Orders - ALM";
  }, []);

  return (
    <div>
      <h1>Orders!</h1>
      <ul>
        {orders.map((order) => (
          <li>
            <h3>{order.items.length}</h3>
            <Customer />
          </li>
        ))}
      </ul>
    </div>
  );
}
