"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../../../../app-session-context";
import { request } from "../../../../(service)/api-provider";
import EmptyState from "../../../../(component)/(styled)/empty-state";
import { User } from "../../../../(component)/order-card";

export default function Employees({ params }) {
  const { lang, addMessage } = useContext(AppSessionContext);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async (id) => {
    try {
      const query = `?filters[workStores][id][$eq]=${id}&fields=user,name`;
      const { data } = await request("customer", "GET", { query });
      setEmployees(
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
    document.title = "Admin Employees - ALM";
    fetchEmployees(params.storeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.storeId]);

  return (
    <div className={`min-h-[45vh] flex ${!employees[0] ? "items-center" : ""}`}>
      {!employees[0] ? (
        <EmptyState lang={lang} type="no" />
      ) : (
        <ul className="flex-auto min-h-[45vh] w-auto">
          {employees.map((c, i) => (
            <User Tag="li" name={c.name} cls="p-2 my-2 card rounded-md" key={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
