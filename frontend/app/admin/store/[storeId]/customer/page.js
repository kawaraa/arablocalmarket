"use client";

import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../../../app-session-context";
import { request } from "../../../../(service)/api-provider";
import shdCnt from "../../../../(layout)/json/shared-content.json";
import EmptyState from "../../../../(component)/(styled)/empty-state";
import { User } from "../../../../(component)/order-card";

export default function Customer({ params }) {
  const { lang, user, addMessage } = useContext(AppSessionContext);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async (id) => {
    try {
      const query = `?filters[orders][store][id][$eq]=${id}&fields=user,name`;
      const { data } = await request("customer", "GET", { query });
      setCustomers(
        data.map(({ id, attributes }) => {
          if (attributes.name?.toLowerCase().includes("pos") && lang != "en") {
            attributes.name = shdCnt.customerPos[lang];
          }

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
