"use client";

export default function Payout({ lang }) {
  return (
    <section id="payout">
      <h3 className="text-lg font-semibold mb-2 mt-6">{content.h[lang]}</h3>
      <p>banking information</p>
    </section>
  );
}

const content = {
  h: { en: "Payout", ar: "المدفوعات" },
};
