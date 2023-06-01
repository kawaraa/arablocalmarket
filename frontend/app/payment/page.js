"use client";

import { useContext, useEffect } from "react";
import { AppSessionContext } from "../app-session-context";
import { Button } from "../(component)/(styled)/button";

// https://www.youtube.com/watch?v=8DDDeaXSdyg
export default function Payment({ searchParams }) {
  const { lang } = useContext(AppSessionContext);

  console.log("Payment", searchParams);
  console.log("Payment", searchParams.storeId);
  useEffect(() => {
    window.document.title = content.title[lang] + " - ALM";
  }, []);

  // Todo: if the user is not signed in, redirect to sign in
  return (
    <section>
      Todo: if the user has not set up a credit card show a form where he can add the payment details
      <h1 className="text-3xl">{content.h1[lang]}</h1>
      Todo: else Show an icon that indicate his credit card will be used to pay the monthly fee.
      <ul>
        {content.h1List[lang].map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
      <Button>Pay</Button>
    </section>
  );
}

const content = {
  title: { en: "Payment", ar: "الدفع" },
  h1: { en: "Enter your payment details", ar: "أدخل تفاصيل الدفع الخاصة بك" },
  h1List: {
    en: ["You will not be charged until the free trial ends on 01-01-2023", "No commitment, cancel anytime."],
    ar: [
      "لن يتم تحصيل أي رسوم منك حتى انتهاء الفترة التجريبية المجانية في 2023-01-01",
      "لا يوجد التزام ، يمكنك الإلغاء في أي وقت",
    ],
  },
};
