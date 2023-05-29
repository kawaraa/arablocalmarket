"use client";

export default function Payout({ lang }) {
  return (
    <section id="payout">
      <h3 className="text-lg font-semibold mb-2 mt-6">{content.h[lang]}</h3>
      {/* <p>banking information</p> */}

      <p dir="auto" className="text-sm opacity-50">
        {content.noPayout[lang]}
      </p>
    </section>
  );
}

const content = {
  h: { en: "Payout bank account", ar: "طريقة تلقي المدفوعات" },
  noPayout: { en: "You don't have any banking information", ar: "ليس لديك أي معلومات مصرفية" },
};
