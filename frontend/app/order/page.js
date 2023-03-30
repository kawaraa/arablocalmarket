"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import OrderCard from "../(component)/order-card";

export default function Orders(props) {
  const router = useRouter();
  const { lang, user } = useContext(AppSessionContext);
  const orders = [];

  useEffect(() => {
    document.title = "Admin Orders - ALM";
    if (!user) router.replace("/signin");
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
