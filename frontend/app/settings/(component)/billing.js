"use client";

export default function Billing({ lang }) {
  return (
    <section id="billing">
      <h3 className="text-lg font-semibold mb-2 mt-6">{content.h[lang]}</h3>
      <p>Bank Card information</p>
    </section>
  );
}

const content = {
  h: { en: "Billing", ar: "معلومات الدفع" },
};
