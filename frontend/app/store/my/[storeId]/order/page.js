"use client";
import OrderList from "../../../../(component)/order-list";

export default function Orders(props) {
  console.log("Orders: >>>", props);
  const orders = [{ items: ["a", "b"] }];

  useEffect(() => {
    document.title = "Orders - ALM";
  }, []);

  // Todo: Use the search query to read the order ID.
  const orderId = "";

  return (
    <div>
      <h1>Orders!</h1>
      <OrderList orders={orders} openedOrderId={orderId} admin={true} />
    </div>
  );
}
