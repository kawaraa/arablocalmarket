"use client";
import { useContext, useEffect, useState } from "react";
import { AppSessionContext } from "../app-session-context";
import { request } from "../(service)/api-provider";
import { IconButton } from "../(component)/(styled)/button";
import shdCnt from "../(layout)/json/shared-content.json";

export default function Billing({ lang }) {
  const { setAppLoading, addMessage } = useContext(AppSessionContext);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const handleDelete = async (paymentMethodId) => {
    setAppLoading(true);
    try {
      const query = `/payment-method/${paymentMethodId}`;
      const paymentMethods = await request("stripe", "DELETE", { query });
      setPaymentMethods(paymentMethods.filter((p) => p.id != paymentMethodId));
      addMessage({ type: "success", text: shdCnt.done[lang], duration: 3 });
    } catch (error) {
      addMessage({ type: "error", text: error.message, duration: 7 });
    }
    setAppLoading(false);
  };

  const fetchPaymentMethods = async () => {
    try {
      const paymentMethods = await request("stripe", "GET", { query: "/payment-method" });
      setPaymentMethods(paymentMethods);
    } catch (error) {
      console.log("fetchPaymentMethods", error);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <section id="billing">
      <h3 className="mb-2 mt-6 text-lg font-semibold">{content.h[lang]}</h3>
      <ul dir="ltr" className="space-y-2">
        {!paymentMethods[0] ? (
          <p dir="auto" className="text-sm opacity-60">
            {content.noPayment[lang]}
          </p>
        ) : (
          paymentMethods.map((payment, i) => (
            <li
              className="w-full px-3 py-2 flex items-center space-x-2 text-sm rounded border border-bc"
              key={i}>
              <div className="flex-1 flex items-center space-x-4">
                <CreditCardSvg
                  colors={i % 2 != 0 ? undefined : ["#475569", "#1E293B", "#9FA1FF"]}
                  cls="w-10"
                />
                <span className="uppercase">{payment.brand}</span>
                <span className="">**{payment.last4}</span>
              </div>
              <span className="">{new Date(+(payment.created + "000")).toLocaleDateString("nl")}</span>
              <IconButton icon="bin" onClick={() => handleDelete(payment.id)} cls="w-8 hover:text-bg3" />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

const CreditCardSvg = ({ colors = ["#6366F1", "#9FA1FF", "#9FA1FF"], cls }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 24"
    className={"pointer-events-none " + cls}
    aria-hidden="true">
    <defs>
      <linearGradient x1="1.829%" y1="100%" x2="100%" y2="2.925%" id="c1-a">
        <stop stopColor={colors[0]} offset="0%"></stop>
        <stop stopColor={colors[1]} offset="100%"></stop>
        <stop stopColor={colors[2]} offset="100%"></stop>
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect fill="url(#c1-a)" rx="3" width="32" height="24"></rect>
      <ellipse fill="#E61C24" fillRule="nonzero" cx="12.522" cy="12" rx="5.565" ry="5.647"></ellipse>
      <ellipse fill="#F99F1B" fillRule="nonzero" cx="19.432" cy="12" rx="5.565" ry="5.647"></ellipse>
      <path
        d="M15.977 7.578A5.667 5.667 0 0 0 13.867 12c0 1.724.777 3.353 2.11 4.422A5.667 5.667 0 0 0 18.087 12a5.667 5.667 0 0 0-2.11-4.422Z"
        fill="#F26622"
        fillRule="nonzero"></path>
    </g>
  </svg>
);

const content = {
  // Setup billing information
  h: { en: "Payment method", ar: "طريقة الدفع" },
  noPayment: { en: "You don't have any saved payment method", ar: "ليس لديك أي طريقة دفع محفوظة" },
};
