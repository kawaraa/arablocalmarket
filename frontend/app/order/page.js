"use client";
import OrderCard from "../(component)/order-card";

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

      <section>
        <h3>Store 1 name</h3>
        <ul>
          {orders.map((o, i) => (
            <OrderCard {...o} key={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}

const content = {};
