"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../../../app-session-context";
import { request } from "../../../../(service)/api-provider";
import EmptyState from "../../../../(component)/(styled)/empty-state";
import { User } from "../../../../(component)/order-card";

export default function Customer({ params }) {
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [customers, setCustomers] = useState([]);
  console.log("Orders: >>>", params.storeId);

  const fetchCustomers = async (id) => {
    try {
      const query = `?filters[orders][store][id][$eq]=${id}&fields=user,name`;
      const { data } = await request("customer", "GET", { query });
      setCustomers(
        data.map(({ id, attributes }) => {
          attributes.id = id;
          return attributes;
        })
      );
    } catch (err) {
      addMessage({ type: "error", text: err.message, duration: 5 });
    }
  };

  useEffect(() => {
    document.title = "Admin Customers - ALM";
    fetchCustomers(params.storeId);
  }, []);

  return (
    <div className={`min-h-[45vh] flex ${!customers[0] ? "items-center" : ""}`}>
      {!customers[0] ? (
        <EmptyState lang={lang} type="no" />
      ) : (
        <ul className="flex-auto min-h-[45vh] w-auto">
          {customers.map((c, i) => (
            <User Tag="li" name={c.name} cls="p-2 my-2 card rounded-md" key={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
