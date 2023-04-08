"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { request } from "../(service)/api-provider";
import OrderCard from "../(component)/order-card";

export default function Orders(props) {
  const router = useRouter();
  const { lang, user, setAppLoading, addMessage } = useContext(AppSessionContext);
  const orders = [];

  const fetchOrders = async () => {
    setAppLoading(true);
    try {
      // const query = `?filters[customer][id][$eq]=${user.customerId}&populate=*`;
      const query = `?filters[customer][user][$eq]=${user.id}&populate=*`;

      const res = await request("order", "GET", { query });
      console.log(res);
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
    setAppLoading(false);
  };

  useEffect(() => {
    document.title = "Admin Orders - ALM";
    if (!user) router.replace("/signin");
    else fetchOrders();
  }, [user]);

  if (!user) return null;
  return (
    <div>
      <h1 className="">Orders!</h1>

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
